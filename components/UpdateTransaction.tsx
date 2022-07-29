import { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthUserContext";
import { Category, Transaction, TransactionType } from "../types/Transaction";
import { updateTransaction } from "../api/transactionsApi";
import IconButton from "./IconButton";
import Input from "./Input";
import Button from "./Button";
import XIcon from "../assets/icons/x.svg";
import ThreeDotsIcon from "../assets/icons/three-dots.svg";
import Select from "./Select";

interface Props {
  transaction: Transaction;
}
const UpdateTransaction = ({ transaction }: Props): JSX.Element => {
  const { authUser }: any = useAuth();

  const modalRef = useRef<any>();
  const [showModal, setShowModal] = useState(false);

  const [name, setName] = useState(transaction.name);
  const [value, setValue] = useState(transaction.value);
  const [type, setType] = useState(transaction.type);
  const [dateCreated, setDateCreated] = useState(
    new Date(transaction.dateCreated)
  );
  const [category, setCategory] = useState(
    transaction.category?.valueOf() ?? Category.OTHER.valueOf()
  );

  const handleTransactionUpdate = async (): Promise<void> => {
    const updatedTransaction = {
      id: transaction.id,
      userId: authUser.uid,
      name,
      value,
      type,
      category,
      dateCreated: dateCreated.getTime(),
      dateModified: new Date().getTime(),
    };

    await updateTransaction(updatedTransaction);
  };

  const handleModalToggle = (): void =>
    setShowModal((prevState: boolean) => !prevState);

  useEffect(() => {
    const handleClickOutside = (event: Event): void => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleModalToggle();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [modalRef]);

  return (
    <div>
      <IconButton icon={<ThreeDotsIcon />} onClick={handleModalToggle} />
      {showModal && (
        <>
          <div className="update-transaction-modal-overlay"></div>
          <div className="update-transaction-modal" ref={modalRef}>
            <div className="update-transaction-modal-header">
              <h3 className="update-transaction-modal-header-title">
                Update Transaction
              </h3>
              <XIcon onClick={handleModalToggle} />
            </div>

            <Input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              type="number"
              placeholder="Value"
              value={value || ""}
              onChange={(e) => setValue(parseFloat(e.target.value))}
            />
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value.valueOf())}
            >
              {Object.values(Category).map(
                (category): JSX.Element => (
                  <option key={category} value={category.valueOf()}>
                    {category}
                  </option>
                )
              )}
            </Select>
            <Input
              type="date"
              onChange={(e) => setDateCreated(new Date(e.target.value))}
              value={dateCreated.toISOString().substring(0, 10)}
            />

            <div className="update-transaction-modal-category">
              <Input
                type="radio"
                id="Income "
                name="income"
                value={TransactionType.INCOME}
                checked={type === TransactionType.INCOME}
                onChange={() => setType(TransactionType.INCOME)}
                label="Income"
              />
              <Input
                type="radio"
                id="Expense"
                name="expense"
                value={TransactionType.EXPENSE}
                checked={type === TransactionType.EXPENSE}
                onChange={() => setType(TransactionType.EXPENSE)}
                label="Expense"
              />
            </div>

            {transaction.dateModified && (
              <p>
                <span className="update-transaction-modal-last-modified">
                  {new Date(transaction?.dateModified).toDateString()}
                  <span>Last modified</span>
                </span>
              </p>
            )}
            <Button onClick={handleTransactionUpdate} text="Update" />
          </div>
        </>
      )}
    </div>
  );
};

export default UpdateTransaction;
