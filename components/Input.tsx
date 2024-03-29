interface Props {
  placeholder?: string;
  value?: string | number;
  type?: "text" | "number" | "email" | "password" | "date";
  id?: string;
  name?: string;
  onChange?: (event?: any) => void;
  checked?: boolean;
  label?: string;
  pattern?: string;
  min?: number;
  max?: number;
  required?: boolean;
  size?: "large" | "medium";
}

const Input = ({
  placeholder,
  value,
  type = "text",
  id,
  name,
  onChange,
  checked,
  label,
  pattern,
  min,
  max,
  required,
  size,
}: Props): JSX.Element => (
  <div className="w-full flex flex-col">
    {label && (
      <label
        className="block mb-1 text-sm font-semibold text-zinc-900 dark:text-zinc-400"
        htmlFor={name}
      >
        {label}
        {required && <span className="text-red-500 dark:text-red-600">*</span>}
      </label>
    )}
    <input
      className={`${
        size === "large" ? "py-2" : "py-1.5"
      } px-3 w-full text-sm text-zinc-900 rounded-md border bg-zinc-50 border-zinc-300 focus:border-sky-500 focus:ring-sky-400 dark:focus:ring-sky-500 focus:outline-0 dark:border-zinc-500 dark:text-zinc-100 dark:bg-zinc-900`}
      required={required}
      min={min}
      max={max}
      pattern={pattern}
      type={type}
      value={value}
      placeholder={placeholder}
      id={id}
      name={name}
      onChange={onChange}
      checked={checked}
    />
  </div>
);

export default Input;
