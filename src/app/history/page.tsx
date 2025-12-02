import type { Metadata } from "next";
import HistoryPageContainer from "./_containers/HistoryPageContainer";

export const metadata: Metadata = {
	title: "Riwayat",
	description:
		"Lihat riwayat pengecekan sitasi Anda dan pantau dokumen yang telah diverifikasi.",
};

export default function HistoryPage() {
	return <HistoryPageContainer />;
}
