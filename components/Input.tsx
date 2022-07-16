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
}: Props): JSX.Element => {
  const isRadio = type === "radio";

  return (
    <div className="input-container">
      <input
        min={min}
        max={max}
        pattern={pattern}
        className={`input ${isRadio ? "radio" : ""}`}
        type={type}
        value={value}
        placeholder={placeholder}
        id={id}
        name={name}
        onChange={onChange}
        checked={checked}
      />
      {isRadio && <label htmlFor={id} />}
      {label && (
        <label className="label" htmlFor={id}>
          {label}
        </label>
      )}
    </div>
  );
};

export default Input;
