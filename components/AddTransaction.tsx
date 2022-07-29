import { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthUserContext";
import { Category, Transaction, TransactionType } from "../types/Transaction";
import { createTransaction } from "../api/transactionsApi";
import Button from "./Button";
import Input from "./Input";
import Select from "./Select";
import XIcon from "../assets/icons/x.svg";
import PlusIcon from "../assets/icons/plus.svg";
import IconButton from "./IconButton";

const AddTransaction = (): JSX.Element => {
  const { authUser }: any = useAuth();

  const modalRef = useRef<any>();
  const [showModal, setShowModal] = useState(false);

  const [name, setName] = useState("");
  const [value, setValue] = useState(0);
  const [type, setType] = useState(TransactionType.EXPENSE);
  const [dateCreated, setDateCreated] = useState(new Date());
  const [category, setCategory] = useState(Category.OTHER.valueOf());

  const handleTransactionCreate = async (): Promise<void> => {
    const transaction: Transaction = {
      userId: authUser.uid,
      name,
      value,
      type,
      category,
      dateCreated: dateCreated.getTime(),
    };
    createTransaction(transaction);
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
    <div className="add-transaction">
      <IconButton
        variant="secondary"
        icon={<PlusIcon />}
        onClick={handleModalToggle}
      />
      {showModal && (
        <>
          <div className="add-transaction-modal-overlay"></div>
          <div className="add-transaction-modal" ref={modalRef}>
            <div className="add-transaction-modal-header">
              <h3 className="add-transaction-modal-header-title">
                Create Transaction
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
              pattern="[0-9]"
              type="number"
              min={0}
              placeholder="Value"
              onChange={(e) => setValue(parseFloat(e.target.value))}
            />
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value.valueOf())}
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
              onChange={(e) => setDateCreated(new Date(e.target.value))}
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
                onChange={() => setType(TransactionType.INCOME)}
              />
              <Input
                label="Expense"
                type="radio"
                id="Expense"
                name="expense"
                value={TransactionType.EXPENSE}
                checked={type === TransactionType.EXPENSE}
                onChange={() => setType(TransactionType.EXPENSE)}
              />
            </div>
            <Button onClick={handleTransactionCreate} text="Save" />
          </div>
        </>
      )}
    </div>
  );
};

export default AddTransaction;
