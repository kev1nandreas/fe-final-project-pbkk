"use client";

import { ChevronDown, X } from "lucide-react";
import * as React from "react";
import {
	Controller,
	get,
	type RegisterOptions,
	useFormContext,
} from "react-hook-form";
import Select, {
	components,
	type MultiValue,
	type StylesConfig,
} from "react-select";
import ErrorMessage from "@/components/form/ErrorMessage";
import HelperText from "@/components/form/HelperText";
import LabelText from "@/components/form/LabelText";
import clsxm from "@/lib/clsxm";
import type { ExtractProps } from "@/lib/helper";

export type SelectInputProps = {
	label: string | null;
	id: string;
	placeholder?: React.ReactNode;
	helperText?: string;
	type?: string;
	isMulti?: boolean;
	isSearchable?: boolean;
	isClearable?: boolean;
	readOnly?: boolean;
	hideError?: boolean;
	validation?: RegisterOptions;
	options: { value: string | number; label: string }[];
	containerClassName?: string;
	errorMessageClassName?: string;
	labelTextClasname?: string;
	"data-cy"?: string;
} & React.ComponentPropsWithoutRef<"select"> &
	ExtractProps<Select>;

export default function SelectInput({
	disabled,
	readOnly,
	label,
	helperText,
	id,
	isMulti = false,
	isSearchable = true,
	isClearable = true,
	placeholder,
	validation,
	options,
	hideError = false,
	containerClassName,
	errorMessageClassName,
	labelTextClasname,
	"data-cy": dataCy,
	...rest
}: SelectInputProps) {
	const {
		control,
		formState: { errors },
	} = useFormContext();
	const error = get(errors, id);
	const reactId = React.useId();

	const withLabel = label !== null;

	//#region  //*=========== Styles ===========
	const customStyles: StylesConfig = {
		control: (styles: any) => ({
			...styles,
			border: `2px solid ${error ? "#ef4444" : "#bfdbfe"}`, // red-500 : blue-200
			"&:hover": {
				border: `2px solid ${error ? "#ef4444" : "#93c5fd"}`, // red-500 : blue-300
				backgroundColor: error ? "#fef2f2" : "#eff6ff", // red-50 : blue-50
			},
			boxShadow: "none",
			transition: "all 300ms",
			"&:focus-within": {
				border: `2px solid ${error ? "#ef4444" : "#3b82f6"}`, // red-500 : blue-500
				boxShadow: `0 0 0 3px ${error ? "#fee2e2" : "#dbeafe"}`, // red-100 : blue-100
			},
			"*": {
				boxShadow: "none !important",
			},
			borderRadius: "0.5rem", // rounded-lg
			padding: "0 0.75rem",
			background:
				disabled || readOnly
					? "#f3f4f6" // gray-100
					: error
						? "#fef2f2" // red-50
						: "#ffffff", // white
			cursor: disabled || readOnly ? "not-allowed" : "pointer",
			color: "#111827", // gray-900
			margin: "0 auto",
			fontSize: "0.875rem", // text-sm
			minHeight: "2.5rem",
		}),
		valueContainer: (styles: any) => ({
			...styles,
			padding: 0,
			gap: "0.5rem",
		}),
		input: (styles: any) => ({
			...styles,
			padding: 0,
			margin: 0,
			fontSize: "0.875rem", // text-sm
			caretColor: "#3b82f6", // blue-500
			color: "#111827", // gray-900
			"::placeholder": {
				color: "#6b7280", // gray-500
			},
		}),
		indicatorsContainer: (styles: any) => ({
			...styles,
			"&>div": {
				padding: 0,
			},
		}),
		dropdownIndicator: (styles: any) => ({
			...styles,
			color: "#3b82f6", // blue-500
			"&:hover": {
				color: "#2563eb", // blue-600
			},
		}),
		option: (styles: any, state: any) => ({
			...styles,
			color: state.isFocused
				? "#ffffff"
				: state.isSelected
					? "#ffffff"
					: "#111827", // white : white : gray-900
			fontWeight: state.isSelected ? "500" : "normal",
			background: state.isDisabled
				? "#f3f4f6" // gray-100
				: state.isFocused
					? "#3b82f6" // blue-500
					: state.isSelected
						? "#2563eb" // blue-600
						: "#ffffff", // white
			":hover": {
				background: "#3b82f6", // blue-500
				color: "#ffffff", // white
			},
			cursor: state.isDisabled ? "not-allowed" : "pointer",
			transition: "all 150ms",
		}),
		multiValue: (styles: any) => ({
			...styles,
			display: "flex",
			alignItems: "center",
			gap: "0.25rem",
			background: "#3b82f6", // blue-500
			borderRadius: "0.375rem", // rounded-md
			padding: "0.25rem 0.75rem",
			margin: 0,
		}),
		multiValueLabel: (styles: any) => ({
			...styles,
			color: "#ffffff", // white
			padding: 0,
			paddingLeft: 0,
			fontSize: "0.875rem", // text-sm
		}),
		multiValueRemove: (styles: any) => ({
			...styles,
			color: "#ffffff", // white
			padding: 0,
			paddingLeft: "0.5rem",
			"&:hover": {
				color: "#dbeafe", // blue-100
				backgroundColor: "transparent",
			},
		}),
		menu: (styles: any) => ({
			...styles,
			borderRadius: "0.75rem", // rounded-xl
			overflow: "hidden",
			border: "2px solid #bfdbfe", // blue-200
			boxShadow:
				"0 10px 15px -3px rgb(59 130 246 / 0.1), 0 4px 6px -4px rgb(59 130 246 / 0.1)", // blue shadow
		}),
		menuList: (styles: any) => ({
			...styles,
			maxHeight: "250px",
			overflowY: "auto",
			padding: "0.5rem",
		}),
		clearIndicator: (styles: any) => ({
			...styles,
			color: "#3b82f6", // blue-500
			"&:hover": {
				color: "#2563eb", // blue-600
			},
		}),
		placeholder: (styles: any) => ({
			...styles,
			color: "#6b7280", // gray-500
			fontSize: "0.875rem", // text-sm
		}),
	};
	//#endregion  //*======== Styles ===========

	return (
		<div className={containerClassName}>
			{withLabel && (
				<LabelText
					required={!!validation?.required}
					labelTextClasname={labelTextClasname}
				>
					{label}
				</LabelText>
			)}
			<div
				className={clsxm(
					"relative",
					withLabel && "mt-1",
					(disabled || readOnly) && "cursor-not-allowed",
				)}
				data-cy={dataCy}
			>
				<Controller
					name={id}
					control={control}
					rules={validation}
					render={({ field }: any) => {
						return (
							<Select
								{...field}
								value={
									//? null is needed so if the selected value is not found in the options, it will clear the value
									isMulti
										? field.value?.map(
												(value: unknown) =>
													options.find(
														(option: any) => option.value === value,
													) ?? null,
											)
										: (options.find((opt: any) => opt.value === field.value) ??
											null)
								}
								onChange={(selectedOptions: any) => {
									isMulti
										? field.onChange(
												(
													selectedOptions as MultiValue<
														(typeof options)[number]
													>
												).map((option: any) => option?.value ?? ""),
											)
										: field.onChange(
												(selectedOptions as (typeof options)[number])?.value ??
													"",
											);
								}}
								isDisabled={disabled || readOnly}
								isClearable={isClearable}
								isMulti={isMulti}
								isSearchable={isSearchable}
								closeMenuOnSelect={!isMulti}
								menuPlacement="auto"
								menuPosition="fixed"
								placeholder={placeholder}
								options={options}
								classNames={{
									control: () => "!min-h-[2.25rem] md:!min-h-[2.5rem]",
								}}
								styles={customStyles}
								instanceId={reactId}
								components={{
									IndicatorSeparator: () => null,
									DropdownIndicator: (props: any) => (
										<components.DropdownIndicator {...props}>
											<ChevronDown size={18} />
										</components.DropdownIndicator>
									),
									ClearIndicator: (props: any) => (
										<components.ClearIndicator {...props}>
											<X size={18} className="mr-0.5" />
										</components.ClearIndicator>
									),
									MultiValueRemove: (props: any) => (
										<components.MultiValueRemove {...props}>
											<X size={16} />
										</components.MultiValueRemove>
									),
								}}
								{...rest}
								data-cy={dataCy}
							/>
						);
					}}
				/>
				{!hideError && error && (
					<ErrorMessage className={clsxm("mt-2", errorMessageClassName)}>
						{error?.message?.toString()}
					</ErrorMessage>
				)}
				{helperText && <HelperText>{helperText}</HelperText>}
			</div>
		</div>
	);
}
