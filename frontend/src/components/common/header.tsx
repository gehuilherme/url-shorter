import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/theme-toggle";

export default function Header() {
  return (
    <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 fixed w-full top-0 z-10">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 border-border/40">
        <div className="flex items-center">
          <div className="mr-4">
            <Link href="/">URL Shorter</Link>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <ModeToggle />
          {/* <Button asChild variant="outline">
            <Link href="/register">Registrar</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/login">Entrar</Link>
          </Button> */}
        </div>
      </div>
    </div>
  );
}
