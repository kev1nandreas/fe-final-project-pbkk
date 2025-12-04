"use client";

import { HelpCircle, X } from "lucide-react";
import { useState } from "react";
import Button from "./button/Button";

interface FloatingHelpButtonProps {
	href?: string | "#";
}

export default function FloatingHelpButton(_props: FloatingHelpButtonProps) {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleClick = (e: React.MouseEvent) => {
		e.preventDefault();
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	return (
		<>
			<button
				type="button"
				onClick={handleClick}
				className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 cursor-pointer rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ease-in-out animate-[bounce_1.5s_infinite] hover:animate-none"
				aria-label="Help"
			>
				<HelpCircle size={28} />
			</button>

			{/* Video Modal */}
			{isModalOpen && (
				<Button
					className="fixed inset-0 z-100 flex items-center justify-center bg-black/70 backdrop-blur-sm"
					onClick={closeModal}
				>
					<Button
						type="button"
						className="relative w-full max-w-4xl mx-4 bg-white rounded-lg shadow-2xl overflow-hidden"
						onClick={(e) => e.stopPropagation()}
					>
						{/* Close Button */}
						<button
							type="button"
							onClick={closeModal}
							className="absolute top-4 right-4 z-10 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-colors"
							aria-label="Close"
						>
							<X size={24} className="text-gray-800" />
						</button>

						{/* Video Container */}
						<div className="relative w-full pt-[56.25%]">
							<iframe
								className="absolute top-0 left-0 w-full h-full"
								src="https://www.youtube.com/embed/SblEZ4-cEVY?autoplay=1"
								title="YouTube video player"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
								allowFullScreen
							/>
						</div>
					</Button>
				</Button>
			)}
		</>
	);
}
