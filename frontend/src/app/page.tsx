import Header from "@/components/common/header";
import ToGenerateURLForm from "@/components/forms/to-generate-url";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Header />
      <div className="flex justify-center items-center h-screen">
        <ToGenerateURLForm />
      </div>
    </>
  );
}
