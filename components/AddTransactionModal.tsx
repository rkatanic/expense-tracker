import { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthUserContext";
import { Category, Transaction, TransactionType } from "../types/Transaction";
import { createTransaction } from "../api/transactionsApi";
import Button from "./Button";
import Input from "./Input";
import Select from "./Select";
import XIcon from "../assets/icons/x.svg";

interface Props {
  onClose: () => void;
  isOpen: boolean;
}
const INITIAL_NEW_TRANSACTION = {
  name: "",
  value: 0,
  type: TransactionType.EXPENSE,
  category: Category.OTHER.valueOf(),
  dateCreated: new Date(),
};

const AddTransactionModal = ({ onClose, isOpen }: Props): JSX.Element => {
  const { authUser }: any = useAuth();

  const modalRef = useRef<any>();

  const [newTransaction, setNewTransaction] = useState(INITIAL_NEW_TRANSACTION);
  const { name, value, type, category, dateCreated } = newTransaction;

  const handleTransactionCreate = async (): Promise<void> => {
    const transaction: Transaction = {
      ...newTransaction,
      userId: authUser.uid,
      dateCreated: dateCreated.getTime(),
    };

    createTransaction(transaction);
    onClose();
    setNewTransaction(INITIAL_NEW_TRANSACTION);
  };

  useEffect(() => {
    const handleClickOutside = (event: Event): void => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
        setNewTransaction(INITIAL_NEW_TRANSACTION);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [modalRef]);

  return (
    <div className="add-transaction">
      {isOpen ? (
        <>
          <div className="add-transaction-modal-overlay"></div>
          <form
            className="add-transaction-modal"
            ref={modalRef}
            onSubmit={handleTransactionCreate}
          >
            <div className="add-transaction-modal-header">
              <h3 className="add-transaction-modal-header-title">
                Create Transaction
              </h3>
              <XIcon onClick={onClose} />
            </div>

            <Input
              required
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) =>
                setNewTransaction({ ...newTransaction, name: e.target.value })
              }
            />
            <Input
              required
              pattern="[0-9]"
              type="number"
              min={0}
              placeholder="Value"
              onChange={(e) =>
                setNewTransaction({
                  ...newTransaction,
                  value: parseFloat(e.target.value),
                })
              }
            />
            <Select
              value={category}
              onChange={(e) =>
                setNewTransaction({
                  ...newTransaction,
                  category: e.target.value.valueOf(),
                })
              }
            >
              {Object.values(Category).map(
                (category, i): JSX.Element => (
                  <option key={i} value={category.valueOf()}>
                    {category}
                  </option>
                )
              )}
            </Select>
            <Input
              type="date"
              onChange={(e) =>
                setNewTransaction({
                  ...newTransaction,
                  dateCreated: new Date(e.target.value),
                })
              }
              value={dateCreated.toISOString().substring(0, 10)}
            />
            <div className="add-transaction-modal-category">
              <Input
                label="Income"
                type="radio"
                id="Income "
                name="income"
                value={TransactionType.INCOME}
                checked={type === TransactionType.INCOME}
                onChange={() =>
                  setNewTransaction({
                    ...newTransaction,
                    type: TransactionType.INCOME,
                  })
                }
              />
              <Input
                label="Expense"
                type="radio"
                id="Expense"
                name="expense"
                value={TransactionType.EXPENSE}
                checked={type === TransactionType.EXPENSE}
                onChange={() =>
                  setNewTransaction({
                    ...newTransaction,
                    type: TransactionType.EXPENSE,
                  })
                }
              />
            </div>
            <Button type="submit" text="Save" />
          </form>
        </>
      ) : null}
    </div>
  );
};

export default AddTransactionModal;
