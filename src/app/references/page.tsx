import type { Metadata } from "next";
import ReferencesPageContainer from "./_containers/ReferencesPageContainer";

export const metadata: Metadata = {
	title: "Referensi",
	description:
		"Kelola koleksi referensi Anda dan unggah dokumen tambahan untuk memperluas katalog sitasi.",
};

export default function ReferencesPage() {
	return <ReferencesPageContainer />;
}
