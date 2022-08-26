import { EffectCallback, useEffect, useRef, useState } from "react";
import IconButton from "./IconButton";
import ThreeDotsIcon from "../assets/icons/three-dots.svg";
import UpdateTransaction from "./UpdateTransaction";
import { Transaction } from "../types/Transaction";
import { deleteTransaction } from "../api/transactionsApi";
import { useGlobalContext } from "../context/GlobalContext";
import TrashIcon from "../assets/icons/trash.svg";
import EditIcon from "../assets/icons/edit.svg";

interface Props {
  transaction: Transaction;
}

const TransactionsTableActions = ({ transaction }: Props): JSX.Element => {
  const actionsListRef = useRef<any>();
  const [showActions, setShowActions] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const { useFetchData } = useGlobalContext();

  const handleTransactionDelete = async (): Promise<void> => {
    handleActionsShowClose();
    await deleteTransaction(transaction.id as string);
    useFetchData();
  };

  useEffect((): ReturnType<EffectCallback> => {
    const handleClickOutside = (event: Event): void => {
      if (
        actionsListRef.current &&
        !actionsListRef.current.contains(event.target)
      ) {
        handleActionsShowToggle();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return (): void =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [actionsListRef]);

  const handleActionsShowToggle = (): void =>
    setShowActions((prevState) => !prevState);

  const handleActionsShowClose = (): void => {
    setShowActions(false);
  };

  const handleModalToggle = (): void => {
    setShowUpdateModal((prevState) => !prevState);
  };

  return (
    <div className="transactions-table-actions">
      <IconButton icon={<ThreeDotsIcon />} onClick={handleActionsShowToggle} />
      {showActions && (
        <div ref={actionsListRef} className="transactions-table-actions-list">
          <div
            className="transactions-table-actions-list-item"
            onClick={handleTransactionDelete}
          >
            <TrashIcon />
            Delete
          </div>
          <div
            className="transactions-table-actions-list-item"
            onClick={handleModalToggle}
          >
            <EditIcon />
            Update
          </div>
          <UpdateTransaction
            onClose={handleModalToggle}
            isOpen={showUpdateModal}
            transaction={transaction}
          />
        </div>
      )}
    </div>
  );
};

export default TransactionsTableActions;
