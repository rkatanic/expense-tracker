interface Props {
  text: string;
  type?: "button" | "submit";
  onClick?: () => void;
  fullWidth?: boolean;
  disabled?: boolean;
  size?: "large";
  variant?: "primary" | "secondary";
}

const Button = ({
  text,
  type = "button",
  onClick,
  fullWidth,
  disabled,
  size,
  variant = "primary",
}: Props) => {
  const getButtonStyle = (): string => {
    switch (variant) {
      case "primary":
        return "border-emerald-600 bg-emerald-500 hover:bg-emerald-600 hover:border-emerald-700";
      case "secondary":
        return "border-zinc-300 bg-zinc-50 hover:bg-zinc-100 text-zinc-800";
      default:
        return "border-zinc-300 bg-zinc-50 hover:bg-zinc-100 text-zinc-800";
    }
  };

  return (
    <button
      className={`${
        size === "large" ? "py-2" : "py-1.5"
      } shadow-sm font-semibold text-sm border 
            px-4 rounded-md text-white  dark:shadow-md
             ${fullWidth ? "btn-full-width" : ""} ${getButtonStyle()}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
