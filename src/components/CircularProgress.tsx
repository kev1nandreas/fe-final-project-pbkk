interface CircularProgressProps {
	score: number;
	size?: number;
	strokeWidth?: number;
	className?: string;
	showPercentage?: boolean;
	color?: "blue" | "green" | "red" | "yellow" | "purple";
	animated?: boolean;
}

export default function CircularProgress({
	score,
	size = 120,
	strokeWidth = 15,
	className = "",
	showPercentage = true,
	color = "blue",
	animated = true,
}: CircularProgressProps) {
	const normalizedScore = Math.min(Math.max(score, 0), 100);

	const radius = (size - strokeWidth) / 2;
	const circumference = radius * 2 * Math.PI;
	const strokeDasharray = circumference;
	const strokeDashoffset =
		circumference - (normalizedScore / 100) * circumference;

	const colorVariants = {
		blue: {
			progress: "stroke-blue-500",
			background: "stroke-blue-100",
			text: "text-blue-600",
		},
		green: {
			progress: "stroke-green-500",
			background: "stroke-green-100",
			text: "text-green-600",
		},
		red: {
			progress: "stroke-red-500",
			background: "stroke-red-100",
			text: "text-red-600",
		},
		yellow: {
			progress: "stroke-yellow-500",
			background: "stroke-yellow-100",
			text: "text-yellow-600",
		},
		purple: {
			progress: "stroke-purple-500",
			background: "stroke-purple-100",
			text: "text-purple-600",
		},
	};

	const getScoreColor = () => {
		if (normalizedScore >= 80) return "green";
		if (normalizedScore >= 60) return "blue";
		if (normalizedScore >= 40) return "yellow";
		return "red";
	};

	const finalColor =
		color === "blue" && normalizedScore > 0 ? getScoreColor() : color;
	const colors = colorVariants[finalColor];

	return (
		<div
			className={`relative inline-flex items-center justify-center ${className}`}
		>
			<svg
				width={size}
				height={size}
				className="transform -rotate-90"
				viewBox={`0 0 ${size} ${size}`}
				aria-hidden="true"
			>
				{/* Background Circle */}
				<circle
					cx={size / 2}
					cy={size / 2}
					r={radius}
					fill="transparent"
					className={colors.background}
					strokeWidth={strokeWidth}
				/>

				{/* Progress Circle */}
				<circle
					cx={size / 2}
					cy={size / 2}
					r={radius}
					fill="transparent"
					className={`${colors.progress} ${
						animated ? "transition-all duration-1000 ease-out" : ""
					}`}
					strokeWidth={strokeWidth}
					strokeLinecap="round"
					strokeDasharray={strokeDasharray}
					strokeDashoffset={strokeDashoffset}
				/>
			</svg>

			<div className="absolute inset-0 flex items-center justify-center">
				<div className="text-center">
					<div
						className={`text-2xl font-bold ${colors.text} ${
							animated ? "transition-colors duration-500" : ""
						}`}
					>
						{Math.round(normalizedScore)}
						{showPercentage && <span className="text-sm">%</span>}
					</div>
					<div className="text-xs text-gray-500 mt-1">Score</div>
				</div>
			</div>
		</div>
	);
}
