import type { Metadata } from "next";
import StartPageContainer from "./_containers/StartPageContainer";

export const metadata: Metadata = {
	title: "Mulai Menggunakan",
	description:
		"Mulai menggunakan AI Research Assistant untuk melakukan riset dengan lebih efisien.",
};

export default function UploadPage() {
	return <StartPageContainer />;
}
