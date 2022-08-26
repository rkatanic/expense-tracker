import { Transaction } from "../types/Transaction";
import { DATE_FORMAT } from "../util/dateTimeUtils";
import { getCategoryColor } from "../util/utils";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

interface Props {
  transaction: Transaction;
  editTransaction: () => void;
  deleteTransaction: () => void;
}

const TransactionTableItem = ({
  transaction,
  editTransaction,
  deleteTransaction,
}: Props): JSX.Element => {
  return (
    <tr
      key={transaction.id}
      className="bg-white dark:bg-zinc-900 border-b dark:border-zinc-800"
    >
      <td className="p-4 font-semibold text-zinc-800 dark:text-zinc-400">
        {transaction.name}
      </td>
      <td className="whitespace-nowrap p-4 font-semibold text-zinc-800 dark:text-zinc-400">
        {transaction.value}
        <span className="ml-1 text-xs text-zinc-400 dark:text-zinc-500 font-normal">
          BAM
        </span>
      </td>
      <td className="hidden p-4 font-semibold md:table-cell">
        {transaction.type === "Income" ? (
          <span className="rounded-full border text-xs font-medium px-2 py-0.5 border-emerald-400 bg-emerald-50 text-emerald-500 dark:border-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
            Income
          </span>
        ) : (
          <span className="rounded-full border text-xs font-medium px-2 py-0.5 border-zinc-400 bg-zinc-50 text-zinc-500 dark:border-zinc-600 dark:bg-zinc-500/10 dark:text-zinc-400">
            Expense
          </span>
        )}
      </td>
      <td className="hidden p-4 text-zinc-500 dark:text-zinc-400 sm:flex sm:items-center sm:gap-2">
        <div
          className={`w-2.5 h-2.5 rounded-full ${getCategoryColor(
            transaction?.category
          )}`}
        />
        {transaction.category}
      </td>
      <td className="hidden p-4 text-zinc-500 dark:text-zinc-400 lg:table-cell">
        {DATE_FORMAT.format(new Date(transaction.dateCreated))}
      </td>
      <td className="p-4 text-zinc-800 dark:text-zinc-400 flex justify-end gap-4">
        <FiEdit2
          onClick={editTransaction}
          className="stroke-zinc-500 hover:stroke-emerald-500 cursor-pointer"
        />
        <FiTrash2
          onClick={deleteTransaction}
          className="stroke-zinc-500 hover:stroke-rose-500 cursor-pointer"
        />
      </td>
    </tr>
  );
};

export default TransactionTableItem;
