import type { Metadata } from "next";
import Hero from "./_containers/Hero";
import UsagePlan from "./_containers/UsagePlan";

export const metadata: Metadata = {
	title: "Citacheck - AI Research Assistant",
	description:
		"AI Research Assistant membantu Anda melakukan riset dengan lebih efisien menggunakan kecerdasan buatan.",
};

export default function Home() {
	return (
		<>
			<Hero />
			<UsagePlan />
		</>
	);
}
