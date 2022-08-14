interface Props {
  placeholder?: string;
  value?: string | number;
  type?: "text" | "number" | "email" | "password" | "date" | "radio";
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
}: Props): JSX.Element => {
  const isRadio = type === "radio";

  return (
    <div className="w-full flex flex-col">
      {label && (
        <label
          className="block mb-1 text-sm font-semibold text-gray-900 dark:text-gray-400"
          htmlFor=""
        >
          {label}
        </label>
      )}
      <input
        className={`${
          size === "large" ? "py-2.5" : "py-2 "
        } px-3 w-full shadow-sm text-sm text-gray-900 rounded-md border bg-white border-gray-200  focus:outline-cyan-500 dark:focus:outline-0 dark:focus:border-cyan-500 dark:border-gray-700 dark:text-gray-100 dark:bg-gray-800/70`}
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
};

export default Input;
