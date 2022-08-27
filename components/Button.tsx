interface Props {
  text: string;
  type?: "button" | "submit";
  onClick?: () => void;
  fullWidth?: boolean;
  disabled?: boolean;
  size?: "large";
  variant?: "primary" | "secondary" | "danger";
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
        return "border-emerald-600 bg-emerald-500 hover:bg-emerald-600 hover:border-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600 dark:hover:border-emerald-500 dark:border-emerald-600";
      case "danger":
        return "border-rose-600 bg-rose-500 hover:bg-rose-600 hover:border-rose-700 dark:bg-rose-700 dark:hover:bg-rose-600 dark:hover:border-rose-500";
      case "secondary":
        return "border-zinc-300 bg-zinc-50 hover:bg-zinc-100 text-zinc-800 dark:bg-zinc-700 dark:text-zinc-300 dark:border-zinc-600 dark:hover:bg-zinc-600 dark:hover:border-zinc-500";
      default:
        return "border-zinc-300 bg-zinc-50 hover:bg-zinc-100 text-zinc-800 dark:bg-zinc-700 dark:text-zinc-300 dark:border-zinc-600 dark:hover:bg-zinc-600 dark:hover:border-zinc-500";
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
