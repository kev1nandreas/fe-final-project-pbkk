"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import QueryBox from "./QueryBox";
import UploadModal from "./UploadModal";

export default function StartPageContainer() {
	const planParams = useSearchParams().get("plan");
	const [isOpen, setIsOpen] = useState(false);
	const [isQueryOpen, setIsOpenQuery] = useState(true);
	const [isWithCitation, setIsWithCitation] = useState(false);

	useEffect(() => {
		if (planParams === "with-citation") {
			setIsWithCitation(true);
			setIsOpen(true);
			setIsOpenQuery(false);
		} else if (planParams === "without-citation") {
			setIsWithCitation(false);
			setIsOpenQuery(true);
			setIsOpen(false);
		}
	}, [planParams]);

	if (!isWithCitation)
		return (
			<div className="min-h-[calc(100vh-4rem)] bg-linear-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
				<QueryBox isOpen={true} />
			</div>
		);

	return (
		<div className="min-h-[calc(100vh-4rem)] bg-linear-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
			{isQueryOpen ? (
				<QueryBox isOpen={isQueryOpen} />
			) : (
				<UploadModal isOpen={isOpen} onClose={() => setIsOpenQuery(true)} />
			)}
		</div>
	);
}
