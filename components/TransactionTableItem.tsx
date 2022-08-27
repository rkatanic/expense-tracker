import { Transaction } from "../types/Transaction";
import { DATE_FORMAT } from "../util/dateTimeUtils";
import { getCategoryColor } from "../util/utils";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import React from "react";
import TransactionDeleteModal from "./TransactionDeleteModal";
import UpdateTransactionModal from "./UpdateTransactionModal";
import { useGlobalContext } from "../context/GlobalContext";

interface Props {
  transaction: Transaction;
}

const TransactionTableItem = ({ transaction }: Props): JSX.Element => {
  const { fetchData } = useGlobalContext();

  const [showUpdateModal, setShowUpdateModal] = React.useState(false);
  const [showDeletetionModal, setShowDeletionModal] = React.useState(false);

  const handleShowUpdateModalToggle = (): void => {
    setShowUpdateModal((prevState) => !prevState);
  };

  const handleShowDeletionModalToggle = (): void => {
    setShowDeletionModal((prevState) => !prevState);
  };

  const deleteTransaction = async (transactionId: string): Promise<void> => {
    handleShowDeletionModalToggle();
    await deleteTransaction(transactionId);
    fetchData();
  };

  return (
    <div
      key={transaction.id}
      className="text-sm flex w-full bg-white dark:bg-zinc-800 border-t dark:border-zinc-700"
    >
      <div className="flex-1 p-4 font-semibold text-zinc-800 dark:text-zinc-400">
        {transaction.name}
      </div>
      <div className="flex-1 whitespace-nowrap p-4 font-semibold text-zinc-800 dark:text-zinc-400">
        {transaction.value}
        <span className="ml-1 text-xs text-zinc-400 dark:text-zinc-500 font-normal">
          BAM
        </span>
      </div>
      <div className="flex-1 hidden p-4 font-semibold md:table-cell">
        {transaction.type === "Income" ? (
          <span className="rounded-full border text-xs font-medium px-2 py-0.5 border-emerald-400 bg-emerald-50 text-emerald-500 dark:border-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
            Income
          </span>
        ) : (
          <span className="rounded-full border text-xs font-medium px-2 py-0.5 border-zinc-400 bg-zinc-50 text-zinc-500 dark:border-zinc-600 dark:bg-zinc-500/10 dark:text-zinc-400">
            Expense
          </span>
        )}
      </div>
      <div className="flex-2 hidden p-4 text-zinc-500 dark:text-zinc-400 sm:flex sm:items-center sm:gap-2">
        <div
          className={`w-2.5 h-2.5 rounded-full ${getCategoryColor(
            transaction?.category
          )}`}
        />
        {transaction.category}
      </div>
      <div className="flex-1 hidden p-4 text-zinc-500 dark:text-zinc-400 lg:table-cell">
        {DATE_FORMAT.format(new Date(transaction.dateCreated))}
      </div>
      <div className="flex-1 p-4 text-zinc-800 dark:text-zinc-400 flex justify-end gap-4">
        <FiEdit2
          onClick={handleShowUpdateModalToggle}
          className="stroke-zinc-500 hover:stroke-emerald-500 cursor-pointer"
        />
        <FiTrash2
          onClick={handleShowDeletionModalToggle}
          className="stroke-zinc-500 hover:stroke-rose-500 cursor-pointer"
        />
      </div>
      <TransactionDeleteModal
        isOpen={showDeletetionModal}
        onClose={handleShowDeletionModalToggle}
        transactionName={transaction?.name as string}
        onDelete={(): Promise<void> =>
          deleteTransaction(transaction?.id as string)
        }
      />
      <UpdateTransactionModal
        isOpen={showUpdateModal}
        transaction={transaction as Transaction}
        onClose={handleShowUpdateModalToggle}
      />
    </div>
  );
};

export default TransactionTableItem;
