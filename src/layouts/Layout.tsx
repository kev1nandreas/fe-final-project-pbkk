import FloatingHelpButton from "@/components/FloatingHelpButton";
import Footer from "@/layouts/Footer";
import Navbar from "@/layouts/Navbar";

interface LayoutProps {
	children: React.ReactNode;
	withFooter?: boolean;
	withNavbar?: boolean;
	className?: string;
}
export default function Layout({
	children,
	withFooter,
	withNavbar,
	className,
}: LayoutProps) {
	return (
		<>
			{withNavbar && <Navbar />}
			<FloatingHelpButton href="https://drive.google.com/drive/folders/1JFsc-2r0-0XWEDBTtNyj4eoKLyAwEFnV?usp=sharing" />
			<main className={className}>{children}</main>
			{withFooter && <Footer />}
		</>
	);
}
