import { useState } from "react";
import { useAuth } from "../context/AuthUserContext";
import { Category, Transaction, TransactionType } from "../types/Transaction";
import { updateTransaction } from "../api/transactionsApi";

interface Props {
  transaction: Transaction;
}
const AddTransactionModal = ({ transaction }: Props): JSX.Element => {
  const { authUser }: any = useAuth();

  const [showModal, setShowModal] = useState(false);

  const [name, setName] = useState(transaction.name);
  const [value, setValue] = useState(transaction.value);
  const [type, setType] = useState(transaction.type);
  const [dateCreated, setDateCreated] = useState(
    new Date(transaction.dateCreated)
  );
  const [category, setCategory] = useState(transaction.category?.valueOf());

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

  return (
    <div>
      <button onClick={() => setShowModal((prevState) => !prevState)}>
        edit
      </button>
      {showModal && (
        <>
          <button onClick={handleTransactionUpdate}>update transaction</button>
          <label htmlFor="Income">Income</label>
          <input
            type="radio"
            id="Income "
            name="fav_language"
            value={TransactionType.INCOME}
            checked={type === TransactionType.INCOME}
            onChange={() => setType(TransactionType.INCOME)}
          />

          <div>
            <label htmlFor="Expense">Expense</label>
            <input
              type="radio"
              id="Expense"
              name="fav_language"
              value={TransactionType.EXPENSE}
              checked={type === TransactionType.EXPENSE}
              onChange={() => setType(TransactionType.EXPENSE)}
            />
          </div>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Value"
            value={value || ""}
            onChange={(e) => setValue(parseFloat(e.target.value))}
          />
          <select
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
          </select>
          <input
            type="date"
            onChange={(e) => setDateCreated(new Date(e.target.value))}
            value={dateCreated.toISOString().substring(0, 10)}
          />
          {transaction.dateModified && (
            <p>{new Date(transaction?.dateModified).toDateString()}</p>
          )}
        </>
      )}
    </div>
  );
};

export default AddTransactionModal;
