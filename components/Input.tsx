interface Props {
  placeholder: string;
  value: string | number;
  type?: "string" | "number" | "email" | "password";
  id?: string;
  name?: string;
  onChange?: (event: any) => void;
}

const Input = ({
  placeholder,
  value,
  type = "string",
  id,
  name,
  onChange,
}: Props): JSX.Element => {
  return (
    <input
      className="input"
      type={type}
      value={value}
      placeholder={placeholder}
      id={id}
      name={name}
      onChange={onChange}
    />
  );
};

export default Input;
