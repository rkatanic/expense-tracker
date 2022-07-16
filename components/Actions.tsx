import IconButton from "./IconButton";
import SignOutIcon from "../assets/icons/sign-out.svg";
import AddTransaction from "./AddTransaction";
import { useAuth } from "../context/AuthUserContext";

const Actions = (): JSX.Element => {
  const { logout: handleSignOut } = useAuth();

  return (
    <div className="actions">
      <AddTransaction />
      <IconButton
        variant="secondary"
        icon={<SignOutIcon />}
        onClick={handleSignOut}
      />
    </div>
  );
};

export default Actions;
