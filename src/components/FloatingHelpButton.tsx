import { HelpCircle } from "lucide-react";
import UnstyledLink from "./links/UnstyledLink";

interface FloatingHelpButtonProps {
	href?: string | "#";
}

export default function FloatingHelpButton(props: FloatingHelpButtonProps) {
	return (
		<UnstyledLink
			href={props.href ?? "#"}
			className="fixed bottom-6 right-6 z-50 cursor-pointer animate-[bounce_1.5s_infinite] hover:animate-none"
		>
			<button
				type="button"
				className="flex items-center justify-center w-14 h-14 cursor-pointer rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ease-in-out"
				aria-label="Help"
			>
				<HelpCircle size={28} />
			</button>
		</UnstyledLink>
	);
}
