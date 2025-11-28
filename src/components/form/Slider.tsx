import type * as React from "react";
import { get, type RegisterOptions, useFormContext } from "react-hook-form";
import clsxm from "@/lib/clsxm";
import ErrorMessage from "./ErrorMessage";
import HelperText from "./HelperText";
import LabelText from "./LabelText";

export type SliderProps = {
	id: string;
	label?: string;
	helperText?: string;
	hideError?: boolean;
	validation?: RegisterOptions;
	containerClassName?: string;
	min?: number;
	max?: number;
	step?: number;
	showValue?: boolean;
	valueFormatter?: (value: number) => string;
	valueLabel?: string;
} & Omit<React.ComponentPropsWithoutRef<"input">, "type">;

export default function Slider({
	id,
	label,
	helperText,
	hideError = false,
	validation,
	className,
	containerClassName,
	min = 0,
	max = 1,
	step = 0.01,
	showValue = true,
	valueFormatter,
	valueLabel,
	readOnly = false,
	...rest
}: SliderProps) {
	const {
		register,
		watch,
		formState: { errors },
	} = useFormContext();

	const error = get(errors, id);
	const value = watch(id);

	const displayValue = valueFormatter
		? valueFormatter(value)
		: `${(value * 100).toFixed(0)}%`;

	return (
		<div className={clsxm("w-full space-y-1.5", containerClassName)}>
			{(label || showValue) && (
				<div className="flex items-center justify-between">
					{label && (
						<LabelText required={!!validation?.required}>{label}</LabelText>
					)}
					{showValue && (
						<span className="text-lg font-semibold text-blue-600">
							{displayValue}
						</span>
					)}
				</div>
			)}

			<input
				{...register(id, validation)}
				type="range"
				id={id}
				min={min}
				max={max}
				step={step}
				disabled={readOnly}
				className={clsxm(
					"w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600",
					"disabled:cursor-not-allowed disabled:opacity-50",
					"[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5",
					"[&::-webkit-slider-thumb]:bg-blue-600 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer",
					"[&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110",
					"[&::-webkit-slider-thumb]:shadow-lg",
					"[&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5",
					"[&::-moz-range-thumb]:bg-blue-600 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:cursor-pointer",
					"[&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:transition-transform [&::-moz-range-thumb]:hover:scale-110",
					"[&::-moz-range-thumb]:shadow-lg",
					error &&
						"bg-red-200 [&::-webkit-slider-thumb]:bg-red-600 [&::-moz-range-thumb]:bg-red-600",
					className,
				)}
				aria-describedby={id}
				{...rest}
			/>

			{valueLabel && (
				<div className="flex justify-between text-xs text-gray-600">
					<span>{min === 0 ? "0%" : min}</span>
					<span className="text-center">{valueLabel}</span>
					<span>{max === 1 ? "100%" : max}</span>
				</div>
			)}

			{helperText && <HelperText>{helperText}</HelperText>}
			{!hideError && error && (
				<ErrorMessage>{error.message?.toString()}</ErrorMessage>
			)}
		</div>
	);
}
