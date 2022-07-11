interface Props {
  text: string;
  type?: "button" | "submit";
  onClick?: () => void;
  fullWidth?: boolean;
}

const Button = ({ text, type = "button", onClick, fullWidth }: Props) => {
  return (
    <button
      className={`btn-primary ${fullWidth ? "btn-full-width" : ""}`}
      type={type}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
