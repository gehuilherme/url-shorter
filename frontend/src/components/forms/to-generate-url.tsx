"use client"

import { z } from "zod"
import { useState } from "react";
import { Copy, RefreshCcw, Rocket, Check } from "lucide-react"
import { useForm } from "react-hook-form"
import { useToast } from "@/hooks/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const formSchema = z.object({
    url: z.string().min(4).max(500),
})

export default function ToGenerateURLForm() {
    const { toast } = useToast()
    const [isLoading, setIsLoading] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [shortenedURL, setShortenedURL] = useState("");

    const [toCopy, copied] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            url: "",
        },
    });

    const copyToClipboard = () => {
        navigator.clipboard.writeText(shortenedURL).then(() => {
            copied(true);
        });
    };

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);

        let responseData;

        try {
            const send = await fetch('http://localhost:8000/api/urls/create', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ url: values.url }),
            });

            if (!send.ok) {
                console.error("Erro ao enviar dados:", send.statusText);
                return;
            }

            responseData = await send.json();
            setShortenedURL(responseData.new_url);
            setIsDialogOpen(true);
        } catch (error) {
            console.error("Erro na requisição:", error);
            toast({
                title: "Error!",
                description: "Something went wrong. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl">Shorten your URLs quickly and easily!</h1>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="url"
                        render={({ field }) => (
                            <FormItem>
                                {/* <FormLabel>URL</FormLabel> */}
                                <FormControl>
                                    <Input placeholder="Type your URL..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex justify-center">
                        <Button id="sendButton" size="lg" type="submit" disabled={isLoading}>
                            {isLoading ? (
                                <div className="flex items-center gap-2">
                                    <RefreshCcw className="animate-spin" />
                                    <h5 className="font-sans text-lg">Loading...</h5>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <Rocket />
                                    <h5 className="font-sans text-lg">Submit</h5>
                                </div>
                            )}
                        </Button>
                    </div>
                </form>
            </Form>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Your Shortened URL</DialogTitle>
                        <DialogDescription>
                            That's it, you can now share your shortened URL.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex items-center space-x-2">
                        <div className="grid flex-1 gap-2">
                            <Label htmlFor="link" className="sr-only">
                                Link
                            </Label>
                            <Input
                                id="link"
                                defaultValue={shortenedURL}
                                readOnly
                            />
                        </div>
                        <Button size="sm" className="px-3" onClick={copyToClipboard}>
                            <span className="sr-only">Copy</span>
                            {toCopy ? (
                                <div className="flex items-center gap-2">
                                    <Check />
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <Copy />
                                </div>
                            )}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

