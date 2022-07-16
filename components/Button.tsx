interface Props {
  text: string;
  type?: "button" | "submit";
  onClick?: () => void;
  fullWidth?: boolean;
  disabled?: boolean;
}

const Button = ({
  text,
  type = "button",
  onClick,
  fullWidth,
  disabled,
}: Props) => {
  return (
    <button
      className={`btn-primary ${fullWidth ? "btn-full-width" : ""}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
