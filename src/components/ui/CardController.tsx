"use client";

type BaseProps<T> = {
  id: string;
  title: string;
  description?: string;
  helperText?: string;
  disabled?: boolean;
  className?: string;
  value: T;
};

type RangeControllerProps = BaseProps<number> & {
  type: "range";
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  onChange: (value: number) => void;
};

type SelectOption = {
  value: string;
  label: string;
};

type SelectControllerProps = BaseProps<string> & {
  type: "select";
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
};

export type CardControllerProps = RangeControllerProps | SelectControllerProps;

export default function CardController(props: CardControllerProps) {
  const {
    id,
    title,
    description,
    helperText,
    disabled,
    className,
  } = props;

  const cardClasses = `rounded-2xl border border-white/30 bg-white/70 backdrop-blur px-5 py-4 shadow-inner transition-shadow ${
    disabled ? "opacity-60" : "hover:shadow-lg"
  } ${className ?? ""}`;

  const renderSummaryValue = () => {
    if (props.type === "range") {
      const unit = props.unit ?? "";
      return `${props.value}${unit}`;
    }

    const selectedLabel = props.options.find(
      (option) => option.value === props.value
    )?.label;
    return selectedLabel ?? "Not selected";
  };

  return (
    <div className={cardClasses}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <label htmlFor={id} className="text-sm font-semibold text-gray-900">
            {title}
          </label>
          {description && (
            <p className="mt-1 text-xs text-gray-600">{description}</p>
          )}
        </div>
        <span className="text-sm font-semibold text-blue-600">
          {renderSummaryValue()}
        </span>
      </div>

      <div className="mt-4">
        {props.type === "range" ? (
          <div>
            <input
              id={id}
              name={id}
              type="range"
              min={props.min ?? 0}
              max={props.max ?? 100}
              step={props.step ?? 1}
              value={props.value}
              disabled={disabled}
              onChange={(event) => props.onChange(Number(event.target.value))}
              className="h-2 w-full cursor-pointer rounded-full bg-gradient-to-r from-blue-400 to-purple-400"
            />
            <div className="mt-2 flex justify-between text-xs text-gray-500">
              <span>
                {props.min ?? 0}
                {props.unit ?? ""}
              </span>
              <span>
                {props.max ?? 100}
                {props.unit ?? ""}
              </span>
            </div>
          </div>
        ) : (
          <select
            id={id}
            name={id}
            disabled={disabled}
            value={props.value}
            onChange={(event) => props.onChange(event.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white/90 px-4 py-2 text-sm text-gray-800 shadow-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
          >
            {props.placeholder && (
              <option value="" disabled>
                {props.placeholder}
              </option>
            )}
            {props.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}
      </div>

      {helperText && (
        <p className="mt-3 text-xs text-gray-500">{helperText}</p>
      )}
    </div>
  );
}