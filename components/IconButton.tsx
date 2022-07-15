interface Props {
  icon: JSX.Element;
  onClick: () => void;
  type?: "submit" | "button";
}

const IconButton = ({ icon, onClick, type = "button" }: Props) => {
  return (
    <button className="icon-button" type={type} onClick={onClick}>
      {icon}
    </button>
  );
};
export default IconButton;
