import { ChangeEvent, useState } from "react";
import { useAuth } from "../context/AuthUserContext";
import { Category, Transaction, TransactionType } from "../types/Transaction";
import Button from "./Button";
import Input from "./Input";
import Select from "./Select";
import { createTransaction } from "../api/transactionsApi";
import { FiX } from "react-icons/fi";

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

  const [newTransaction, setNewTransaction] = useState(INITIAL_NEW_TRANSACTION);
  const { name, value, type, category, dateCreated } = newTransaction;

  const handleTransactionCreate = async (
    e: ChangeEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    const transaction: Transaction = {
      ...newTransaction,
      userId: authUser.uid,
      dateCreated: dateCreated.getTime(),
    };

    onClose();
    await createTransaction(transaction);
    setNewTransaction(INITIAL_NEW_TRANSACTION);
  };

  const handleModalClose = (): void => {
    setNewTransaction(INITIAL_NEW_TRANSACTION);
    onClose();
  };

  return (
    <>
      {isOpen ? (
        <>
          <div
            onClick={handleModalClose}
            className="fixed inset-0 bg-zinc-500/50 dark:bg-zinc-900/80"
          ></div>

          <div className="flex flex-col h-screen overflow-y-auto border-l fixed top-0 right-0 w-full max-w-sm  bg-white dark:border-zinc-600 dark:bg-zinc-800">
            <h2 className="flex justify-between text-lg font-semibold p-4  border-b dark:text-zinc-200 dark:border-zinc-600">
              New transaction
              <FiX
                onClick={handleModalClose}
                size="1.5rem"
                className="stroke-zinc-400 cursor-pointer"
              />
            </h2>
            <form
              onSubmit={handleTransactionCreate}
              className="flex-1 flex flex-col justify-between gap-6"
            >
              <div className="flex flex-col gap-6 p-4">
                <Input
                  onChange={(e) =>
                    setNewTransaction({
                      ...newTransaction,
                      name: e.target.value,
                    })
                  }
                  required
                  type="text"
                  name="name"
                  label="Name"
                  value={name}
                />

                <Input
                  onChange={(e) =>
                    setNewTransaction({
                      ...newTransaction,
                      value: parseFloat(e.target.value),
                    })
                  }
                  required
                  type="number"
                  name="value"
                  label="Value"
                  value={value}
                />

                <Input
                  required
                  type="date"
                  onChange={(e) =>
                    setNewTransaction({
                      ...newTransaction,
                      dateCreated: new Date(e.target.value),
                    })
                  }
                  value={dateCreated.toISOString().substring(0, 10)}
                  label="Date created"
                />

                <Select
                  value={category}
                  onChange={(e) =>
                    setNewTransaction({
                      ...newTransaction,
                      category: e.target.value.valueOf(),
                    })
                  }
                  name="category"
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
                      onChange={() =>
                        setNewTransaction({
                          ...newTransaction,
                          type: TransactionType.INCOME,
                        })
                      }
                      className="cursor-pointer focus:ring-0 h-4 w-4 bg-zinc-50 border-zinc-300 dark:bg-zinc-700 checked:bg-sky-400 dark:checked:bg-sky-400 dark:border-zinc-600"
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
                      onChange={() =>
                        setNewTransaction({
                          ...newTransaction,
                          type: TransactionType.EXPENSE,
                        })
                      }
                      className="cursor-pointer focus:ring-0 h-4 w-4 bg-zinc-50 border-zinc-300 dark:bg-zinc-700 checked:bg-sky-400 dark:checked:bg-sky-400 dark:border-zinc-600"
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

              <div className="border-t flex justify-end gap-4  px-6 py-4 dark:border-zinc-600">
                <Button
                  variant="secondary"
                  text="Cancel"
                  onClick={handleModalClose}
                />
                <Button type="submit" text="Create" />
              </div>
            </form>
          </div>
        </>
      ) : null}
    </>
  );
};

export default AddTransactionModal;
