import { useState } from "react";
import AddTransactionModal from "./AddTransactionModal";
import Button from "./Button";

const AddTransaction = (): JSX.Element => {
  const [showModal, setShowModal] = useState(false);

  const handleModalToggle = (): void => {
    setShowModal((prevState: boolean) => !prevState);
  };

  return (
    <div className="add-transaction">
      <Button text="Create transaction" onClick={handleModalToggle} />
      <AddTransactionModal isOpen={showModal} onClose={handleModalToggle} />
    </div>
  );
};

export default AddTransaction;
