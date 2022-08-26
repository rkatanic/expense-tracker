import { EffectCallback, useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthUserContext";
import { Category, Transaction, TransactionType } from "../types/Transaction";
import { updateTransaction } from "../api/transactionsApi";
import Input from "./Input";
import Button from "./Button";
import XIcon from "../assets/icons/x.svg";
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
  const { useFetchData } = useGlobalContext();
  const { authUser }: any = useAuth();

  const modalRef = useRef<any>();

  const [name, setName] = useState(transaction?.name);
  const [value, setValue] = useState(transaction?.value);
  const [type, setType] = useState(transaction?.type);
  const [dateCreated, setDateCreated] = useState(
    new Date(transaction?.dateCreated)
  );
  const [category, setCategory] = useState(
    transaction?.category?.valueOf() ?? Category.OTHER.valueOf()
  );
  console.log(dateCreated);

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
    useFetchData();
  };

  useEffect((): ReturnType<EffectCallback> => {
    const handleClickOutside = (event: Event): void => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return (): void =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [modalRef]);

  return (
    <>
      {isOpen ? (
        <>
          <div
            onClick={onClose}
            className="fixed inset-0 bg-zinc-500/50 dark:bg-zinc-900/80"
          ></div>

          <div className="border-l fixed top-0 right-0 w-full max-w-sm  bg-white dark:border-zinc-700 dark:bg-zinc-800">
            <h2 className="flex justify-between text-lg font-semibold p-6  border-b dark:text-zinc-300 dark:border-zinc-700">
              New transaction
              <FiX
                onClick={onClose}
                size="1.5rem"
                className="stroke-zinc-500 cursor-pointer"
              />
            </h2>
            <form
              onSubmit={handleTransactionUpdate}
              className="h-screen flex flex-col shadow-xl p-4 gap-6"
            >
              <div>
                <label
                  className="block mb-1 text-sm font-semibold text-zinc-900 dark:text-zinc-400"
                  htmlFor="input"
                >
                  Name
                  <span className="text-rose-500 dark:text-rose-800">*</span>
                </label>
                <input
                  onChange={(e) => setName(e.target.value)}
                  required
                  type="text"
                  name="name"
                  className="focus:outline-0 focus:ring-emerald-500 shadow-sm w-full text-sm text-zinc-900 px-3 py-1.5 rounded-md border border-zinc-300  focus:outline-emerald-500 dark:text-zinc-100 dark:bg-zinc-900/30 dark:border-zinc-700"
                />
              </div>

              <div>
                <label
                  className="block mb-1 text-sm font-semibold text-zinc-900 dark:text-zinc-400"
                  htmlFor="input"
                >
                  Value
                  <span className="text-rose-500 dark:text-rose-800">*</span>
                </label>
                <input
                  value={value || ""}
                  onChange={(e) => setValue(parseFloat(e.target.value))}
                  required
                  type="number"
                  name="value"
                  className="focus:outline-0 focus:ring-emerald-500 shadow-sm w-full text-sm text-zinc-900 px-3 py-1.5 rounded-md border border-zinc-300  focus:outline-emerald-500 dark:text-zinc-100 dark:bg-zinc-900/30 dark:border-zinc-700"
                />
              </div>

              <div>
                <label
                  className="block mb-1 text-sm font-semibold text-zinc-900 dark:text-zinc-400"
                  htmlFor="input"
                >
                  Date created
                  <span className="text-rose-500 dark:text-rose-800">*</span>
                </label>
                <input
                  required
                  type="date"
                  onChange={(e) => setDateCreated(new Date(e.target.value))}
                  value={dateCreated.toISOString().substring(0, 10)}
                  className="focus:outline-0 focus:ring-emerald-500 shadow-sm w-full text-sm text-zinc-900 px-3 py-1.5 rounded-md border border-zinc-300  focus:outline-emerald-500 dark:text-zinc-100 dark:bg-zinc-900/30 dark:border-zinc-700"
                />
              </div>

              <div>
                <label
                  htmlFor="select"
                  className="block mb-1 text-sm font-semibold text-zinc-900 dark:text-zinc-400"
                >
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value.valueOf())}
                  id="select"
                  name="category"
                  className="w-full text-zinc-900 shadow-sm rounded-md border border-zinc-300 px-3 pr-9 py-1.5 text-sm focus:ring-emerald-500  focus:outline-0 dark:text-zinc-100 dark:bg-zinc-900/30 dark:border-zinc-700"
                >
                  {Object.values(Category).map(
                    (category, i): JSX.Element => (
                      <option key={i} value={category.valueOf()}>
                        {category}
                      </option>
                    )
                  )}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <span className="block mb-1 text-sm font-semibold text-zinc-900 dark:text-zinc-400">
                  Type
                </span>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="Income "
                    name="income"
                    value={TransactionType.INCOME}
                    checked={type === TransactionType.INCOME}
                    onChange={() => setType(TransactionType.INCOME)}
                    className="cursor-pointer focus:ring-0 h-4 w-4 text-emerald-600 border-zinc-300 dark:bg-zinc-700 dark:checked:bg-emerald-600 dark:border-zinc-500"
                  />
                  <label
                    htmlFor="income"
                    className="cursor-pointer ml-2 block text-sm text-zinc-900 dark:text-zinc-100"
                  >
                    Income
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="radio"
                    id="Expense"
                    name="expense"
                    value={TransactionType.EXPENSE}
                    checked={type === TransactionType.EXPENSE}
                    onChange={() => setType(TransactionType.EXPENSE)}
                    className="cursor-pointer border-none focus:outline-0 focus:ring-0 h-4 w-4 text-emerald-600 border-zinc-300 dark:bg-zinc-700 dark:checked:bg-emerald-600 dark:border-zinc-500"
                  />
                  <label
                    htmlFor="expense"
                    className="cursor-pointer ml-2 block text-sm text-zinc-900 dark:text-zinc-100"
                  >
                    Expense
                  </label>
                </div>
              </div>

              <div className="border-t flex justify-end gap-4  px-6 py-4 dark:border-zinc-700">
                <button
                  type="button"
                  className="shadow-sm font-semibold text-sm border border-zinc-300 bg-zinc-50 px-4 py-1.5 rounded-md text-zinc-900 hover:bg-zinc-100 dark:shadow-md dark:bg-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-600 dark:border-zinc-600 dark:hover:border-zinc-500"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <Button type="submit" text="Create" />
              </div>
            </form>
          </div>
        </>
      ) : null}
    </>
  );
};

export default UpdateTransaction;
