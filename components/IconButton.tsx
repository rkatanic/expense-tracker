interface Props {
  icon: JSX.Element;
  onClick: () => void;
  type?: "submit" | "button";
  variant?: "primary" | "secondary";
  disabled?: boolean;
}

const IconButton = ({
  icon,
  onClick,
  type = "button",
  variant = "primary",
  disabled,
}: Props) => {
  return (
    <button
      disabled={disabled}
      className={`icon-button icon-button-${variant}`}
      type={type}
      onClick={onClick}
    >
      {icon}
    </button>
  );
};
export default IconButton;
