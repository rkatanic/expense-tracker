interface Props {
  text: string;
  type?: "button" | "submit";
  onClick?: () => void;
  fullWidth?: boolean;
  disabled?: boolean;
  size?: "large";
}

const Button = ({
  text,
  type = "button",
  onClick,
  fullWidth,
  disabled,
  size,
}: Props) => (
  <button
    className={`${
      size === "large" ? "py-2.5" : "py-2"
    } bg-black border-black hover:bg-gray-800 shadow-sm font-semibold text-sm border dark:border-cyan-700 dark:bg-cyan-600
      px-4 rounded-md text-white dark:hover:bg-cyan-700 dark:hover:border-cyan-600 dark:shadow-md
       ${fullWidth ? "btn-full-width" : ""}`}
    type={type}
    onClick={onClick}
    disabled={disabled}
  >
    {text}
  </button>
);

export default Button;
