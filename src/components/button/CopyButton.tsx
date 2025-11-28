import { Button } from "@headlessui/react";
import { Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

interface CopyButtonProps {
	text: string;
}

export default function CopyButton({ text }: CopyButtonProps) {
	const ref = useRef<HTMLDivElement>(null);
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		if (ref.current) {
			ref.current.addEventListener("mouseenter", () => {
				setIsOpen(true);
			});
			ref.current.addEventListener("mouseleave", () => {
				setIsOpen(false);
			});
		}
	});

	return (
		<Button
			ref={ref}
			onClick={() => {
				navigator.clipboard.writeText(text);
				toast.success("Citation copied to clipboard!");
			}}
			className={`absolute right-2 top-2 px-2 py-1 rounded-md cursor-pointer flex items-center gap-1 hover:bg-blue-100 transition-all ease-in-out duration-300 text-blue-600`}
		>
			<Copy className="text-lg" />{" "}
			<span
				className={`text-sm transition-all ${
					isOpen ? "opacity-100 w-8" : "opacity-0 w-0"
				}`}
				style={{
					transitionProperty: "width, opacity",
					transitionDuration: "400ms, 100ms",
				}}
			>
				Copy
			</span>
		</Button>
	);
}
