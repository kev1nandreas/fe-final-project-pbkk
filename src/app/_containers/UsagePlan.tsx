"use client";

import UsagePlanCard from "@/components/card/UsagePlanCard";

export default function UsagePlan() {
	return (
		<section
			id="get-started"
			className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white to-gray-50"
		>
			<div className="mx-auto px-4 sm:px-6 lg:px-[8%]">
				<div className="text-center mb-12 sm:mb-16">
					<h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
						Pilih{" "}
						<span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
							Jenis Penggunaan
						</span>
					</h2>
					<p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
						Pilih rencana penggunaan yang Anda inginkan untuk mulai mendapatkan
						sitasi Anda hari ini.
					</p>
				</div>

				<div className="flex flex-wrap gap-6 lg:gap-8 max-w-7xl justify-center w-full">
					<UsagePlanCard
						icon="📄"
						header="Gunakan Referensi Anda"
						description="Upload referensi Anda untuk mendapatkan sitasi yang akurat dan cepat dari dokumen Anda. Bantu juga kami meningkatkan database referensi kami!"
						redirectUrl="start?plan=with-citation"
					/>

					<UsagePlanCard
						icon="📝"
						header="Gunakan Referensi Yang Tersedia"
						description="Tahapan mudah untuk mendapatkan sitasi dari referensi yang sudah tersedia di database kami"
						redirectUrl="start?plan=without-citation"
					/>
				</div>
			</div>
		</section>
	);
}
