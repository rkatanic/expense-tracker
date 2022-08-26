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
      size === "large" ? "py-2" : "py-1.5"
    }  shadow-sm font-semibold text-sm border border-emerald-600 bg-emerald-500
      px-4 rounded-md text-white hover:bg-emerald-600 hover:border-emerald-700 dark:shadow-md
       ${fullWidth ? "btn-full-width" : ""}`}
    type={type}
    onClick={onClick}
    disabled={disabled}
  >
    {text}
  </button>
);

export default Button;
