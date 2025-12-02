export default function References({ reference }: { reference: string }) {
	return (
		<div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl p-3 px-4 shadow flex flex-col">
			<div className="flex items-center justify-between mb-2">
				<h3 className="text-lg font-bold text-blue-700">
					{reference.replace(/_/g, " ")}
				</h3>
			</div>
		</div>
	);
}
