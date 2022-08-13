import { useState } from "react";
import PlusIcon from "../assets/icons/plus.svg";
import IconButton from "./IconButton";
import AddTransactionModal from "./AddTransactionModal";
import { useGlobalContext } from "../context/GlobalContext";
import { createTransaction } from "../api/transactionsApi";
import { Transaction } from "firebase/firestore";

const AddTransaction = (): JSX.Element => {
  
  const [showModal, setShowModal] = useState(false);

  const handleModalToggle = (): void => {
    setShowModal((prevState: boolean) => !prevState);
  };

  return (
    <div className="add-transaction">
      <IconButton
        variant="secondary"
        icon={<PlusIcon />}
        onClick={handleModalToggle}
      />
      <AddTransactionModal isOpen={showModal} onClose={handleModalToggle} />
    </div>
  );
};

export default AddTransaction;
