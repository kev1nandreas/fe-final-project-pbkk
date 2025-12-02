import type { Metadata } from "next";
import ResultsPageContainer from "./_containers/ResultsPageContainer";

export const metadata: Metadata = {
	title: "Hasil Analisis",
	description:
		"Lihat hasil analisis sitasi yang telah diproses oleh AI Research Assistant.",
};

export default function ResultPage() {
	return <ResultsPageContainer />;
}
