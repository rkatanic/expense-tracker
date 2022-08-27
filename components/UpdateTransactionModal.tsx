import { useState } from "react";
import { useAuth } from "../context/AuthUserContext";
import { Category, Transaction, TransactionType } from "../types/Transaction";
import { updateTransaction } from "../api/transactionsApi";
import Input from "./Input";
import Button from "./Button";
import { useGlobalContext } from "../context/GlobalContext";
import Select from "./Select";
import { FiX } from "react-icons/fi";

interface Props {
  onClose: () => void;
  transaction: Transaction;
  isOpen: boolean;
}
const UpdateTransaction = ({
  onClose,
  transaction,
  isOpen,
}: Props): JSX.Element => {
  const { fetchData } = useGlobalContext();
  const { authUser }: any = useAuth();

  const [name, setName] = useState(transaction?.name);
  const [value, setValue] = useState(transaction?.value);
  const [type, setType] = useState(transaction?.type);
  const [dateCreated, setDateCreated] = useState(
    new Date(transaction?.dateCreated)
  );
  const [category, setCategory] = useState(
    transaction?.category?.valueOf() ?? Category.OTHER.valueOf()
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

    onClose();
    await updateTransaction(updatedTransaction);
    fetchData();
  };

  return (
    <>
      {isOpen ? (
        <>
          <div
            onClick={onClose}
            className="fixed inset-0 bg-zinc-500/50 dark:bg-zinc-900/80"
          ></div>

          <div className="flex flex-col h-screen overflow-y-auto border-l fixed top-0 right-0 w-full max-w-sm  bg-white dark:border-zinc-700 dark:bg-zinc-800">
            <h2 className="flex justify-between text-lg font-semibold p-4 border-b dark:text-zinc-200 dark:border-zinc-700">
              Update transaction
              <FiX
                onClick={onClose}
                size="1.5rem"
                className="stroke-zinc-500 cursor-pointer"
              />
            </h2>
            <form
              onSubmit={handleTransactionUpdate}
              className="flex-1 flex flex-col justify-between gap-6"
            >
              <div className="flex flex-col gap-6 p-4">
                <Input
                  label="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  type="text"
                  name="name"
                />

                <Input
                  value={value || ""}
                  onChange={(e) => setValue(parseFloat(e.target.value))}
                  required
                  type="number"
                  name="value"
                  label="Value"
                />

                <Input
                  required
                  type="date"
                  onChange={(e) => setDateCreated(new Date(e.target.value))}
                  value={dateCreated.toISOString().substring(0, 10)}
                  label="Date created"
                />

                <Select
                  value={category}
                  onChange={(e) => setCategory(e.target.value.valueOf())}
                  label="Category"
                >
                  {Object.values(Category).map(
                    (category, i): JSX.Element => (
                      <option key={i} value={category.valueOf()}>
                        {category}
                      </option>
                    )
                  )}
                </Select>
                <div className="flex flex-col gap-2">
                  <span className="block mb-1 text-sm font-semibold text-zinc-900 dark:text-zinc-400">
                    Type
                  </span>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="Income"
                      value={TransactionType.INCOME}
                      checked={type === TransactionType.INCOME}
                      onChange={() => setType(TransactionType.INCOME)}
                      className="cursor-pointer focus:ring-0 h-4 w-4 text-emerald-500 bg-zinc-50 border-zinc-300 dark:bg-zinc-700 dark:checked:bg-emerald-600 dark:border-zinc-500"
                    />
                    <label
                      htmlFor="Income"
                      className="cursor-pointer ml-2 block text-sm text-zinc-900 dark:text-zinc-100"
                    >
                      Income
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="Expense"
                      value={TransactionType.EXPENSE}
                      checked={type === TransactionType.EXPENSE}
                      onChange={() => setType(TransactionType.EXPENSE)}
                      className="cursor-pointer focus:outline-0 focus:ring-0 h-4 w-4 text-emerald-500 bg-zinc-50 border-zinc-300 dark:bg-zinc-700 dark:checked:bg-emerald-600 dark:border-zinc-500"
                    />
                    <label
                      htmlFor="Expense"
                      className="cursor-pointer ml-2 block text-sm text-zinc-900 dark:text-zinc-100"
                    >
                      Expense
                    </label>
                  </div>
                </div>
              </div>

              <div className="top-0 border-t flex justify-end gap-4 p-4 dark:border-zinc-700">
                <Button variant="secondary" text="Cancel" onClick={onClose} />
                <Button type="submit" text="Update" />
              </div>
            </form>
          </div>
        </>
      ) : null}
    </>
  );
};

export default UpdateTransaction;
