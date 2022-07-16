interface Props {
  icon: JSX.Element;
  onClick: () => void;
  type?: "submit" | "button";
  variant?: "primary" | "secondary";
}

const IconButton = ({
  icon,
  onClick,
  type = "button",
  variant = "primary",
}: Props) => {
  return (
    <button
      className={`icon-button icon-button-${variant}`}
      type={type}
      onClick={onClick}
    >
      {icon}
    </button>
  );
};
export default IconButton;
