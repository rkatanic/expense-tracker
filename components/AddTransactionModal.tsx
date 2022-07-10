import { useState } from "react";
import { useAuth } from "../context/AuthUserContext";
import { Category, Transaction, TransactionType } from "../types/Transaction";
import { createTransaction } from "../api/transactionsApi";

const TransactionModal = () => {
  const { authUser }: any = useAuth();

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

  return (
    <div>
      <button onClick={handleTransactionCreate}>create new transaction</button>
      <label htmlFor="INCOME">Income</label>
      <input
        type="radio"
        id="Income "
        name="fav_language"
        value={TransactionType.INCOME}
        checked={type === TransactionType.INCOME}
        onChange={() => setType(TransactionType.INCOME)}
      />

      <div>
        <label htmlFor="OUTCOME">Expense</label>
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
        pattern="[0-9]"
        type="number"
        min={0}
        placeholder="Value"
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
    </div>
  );
};

export default TransactionModal;
