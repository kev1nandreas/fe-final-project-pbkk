import CardSwap, { Card } from "@/components/card/CardSwap";
import UnstyledLink from "@/components/links/UnstyledLink";

export default function Hero() {
	return (
		<section id="hero" className="py-20">
			<div className="mx-auto px-6 lg:px-[13%]">
				<div className="flex flex-col lg:flex-row items-center gap-12">
					{/* Left side - Text content */}
					<div className="flex-1 mt-[5rem] text-center lg:text-left">
						<h1 className="text-4xl lg:text-6xl font-bold mb-4">
							<span className="bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
								Cari Sitasi Untuk Teks Anda
							</span>
						</h1>
						<p className="text-lg text-gray-700 mb-8 max-w-xl">
							Masukkan teks dan dapatkan sitasi yang akurat dan relevan secara
							instan dengan CitaCheck.
						</p>
						<UnstyledLink
							href="#get-started"
							className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition"
						>
							Mulai Menggunakan
						</UnstyledLink>
					</div>

					{/* Right side - Card swap */}
					<div
						className="flex-1 w-full rounded-xl overflow-hidden"
						style={{ height: "500px", position: "relative" }}
					>
						<CardSwap
							cardDistance={60}
							verticalDistance={70}
							delay={4000}
							pauseOnHover={true}
						>
							<Card customClass="bg-gradient-to-br from-blue-500 to-blue-700 shadow-xl">
								<div className="flex flex-col items-center justify-center h-full text-white p-4 sm:p-6 md:p-8">
									<div className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4">
										⚡
									</div>
									<h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
										Cepat
									</h3>
									<p className="text-blue-100 text-center text-sm sm:text-base md:text-lg">
										Verifikasi cepat dengan hasil instan
									</p>
								</div>
							</Card>
							<Card customClass="bg-gradient-to-br from-green-500 to-green-700 shadow-xl">
								<div className="flex flex-col items-center justify-center h-full text-white p-4 sm:p-6 md:p-8">
									<div className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4">
										✓
									</div>
									<h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
										Akurat
									</h3>
									<p className="text-green-100 text-center text-sm sm:text-base md:text-lg">
										Pemeriksaan informasi yang tepat dan terpercaya
									</p>
								</div>
							</Card>
							<Card customClass="bg-gradient-to-br from-purple-500 to-purple-700 shadow-xl">
								<div className="flex flex-col items-center justify-center h-full text-white p-4 sm:p-6 md:p-8">
									<div className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4">
										👍
									</div>
									<h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
										Mudah Digunakan
									</h3>
									<p className="text-purple-100 text-center text-sm sm:text-base md:text-lg">
										Antarmuka sederhana untuk semua orang
									</p>
								</div>
							</Card>
						</CardSwap>
					</div>
				</div>
			</div>
		</section>
	);
}
