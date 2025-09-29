import Image from "next/image";
import Button from "../ui/Button";

export default function Hero() {
  return (
    <section className="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-gray-50 text-center px-4">
      <div className="max-w-[35rem] mr-8 text-left">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
          Ensure your paper has the right citations
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-8">
          Citation Checker helps you verify and manage citations in your
          academic papers. It also provides suggestions for improving your
          citation style and format.
        </p>
        <Button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-md shadow-md hover:shadow-lg transition-all duration-200">
          Get Started
        </Button>
      </div>
      <Image
        src="/hero.png"
        alt="Citation Checker"
        className="hidden md:block w-[45rem] object-contain"
        width={500}
        height={500}
      />
    </section>
  );
}
