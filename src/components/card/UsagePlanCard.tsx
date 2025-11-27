"use client";

import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

export interface UsagePlanCardProps {
	icon: ReactNode;
	header: string;
	description: string;
	redirectUrl?: string;
}

export default function UsagePlanCard({
	icon,
	header,
	description,
	redirectUrl,
}: UsagePlanCardProps) {
	const router = useRouter();
	return (
		<div className="relative flex flex-col justify-between p-6 sm:p-8 rounded-2xl border-2 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-gray-200 bg-white hover:border-blue-300 max-w-md w-full">
			<div>
				<div className="flex justify-center mb-4 sm:mb-6">
					<div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center rounded-full text-3xl sm:text-4xl bg-linear-to-br from-gray-100 to-gray-200 text-gray-700">
						{icon}
					</div>
				</div>

				<h3 className="text-2xl sm:text-3xl font-bold text-center mb-2 text-gray-900">
					{header}
				</h3>

				<p className="text-gray-600 text-center mb-6 text-sm sm:text-base leading-relaxed">
					{description}
				</p>
			</div>

			<button
				type="button"
				onClick={() => {
					router.push(redirectUrl || "/");
				}}
				className="w-full cursor-pointer py-3 sm:py-4 px-6 rounded-full font-semibold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-xl bg-blue-600 text-white hover:bg-blue-700"
			>
				Pilih Paket
			</button>
		</div>
	);
}
