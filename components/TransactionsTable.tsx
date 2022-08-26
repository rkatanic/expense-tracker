import * as React from "react";
import Select from "./Select";
import IconButton from "./IconButton";
import ArrowLeftIcon from "../assets/icons/arrow-left.svg";
import ArrowRightIcon from "../assets/icons/arrow-right.svg";
import { useGlobalContext } from "../context/GlobalContext";
import TransactionsTableActions from "./TransactionsTableActions";
import {
  FiArrowLeft,
  FiArrowRight,
  FiEdit2,
  FiTrash2,
  FiFilePlus,
} from "react-icons/fi";
import { Category, Transaction, TransactionType } from "../types/Transaction";
import TransactionDeleteModal from "./TransactionDeleteModal";
import { deleteTransaction } from "../api/transactionsApi";
import Button from "./Button";
import AddTransaction from "./AddTransaction";
import TransactionTableItem from "./TransactionTableItem";

const ROWS_PER_PAGE = [5, 10, 15, 20];

const TransactionTable = (): JSX.Element => {
  const {
    data: { transactions },
  } = useGlobalContext();

  const [rowsPerPage, setRowsPerPage] = React.useState(ROWS_PER_PAGE[0]);
  const [page, setPage] = React.useState(0);

  const handleRowsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setRowsPerPage(+e.target.value);
  };

  const transactionsPerPageRows = transactions.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
  const totalPages = Math.ceil(transactions.length / rowsPerPage);

  const handlePreviousPageSet = (): void => {
    setPage((prevState) => prevState - 1);
  };

  const handleNextPageSet = (): void => {
    setPage((prevState) => prevState + 1);
  };

  return (
    <div className="max-w-5xl m-auto mb-4">
      <div className="flex items-end justify-between gap-4 my-4 mt-8">
        <h2 className="flex font-semibold text-sm dark:text-zinc-200 rounded-md border">
          <div className="px-4 py-1.5 border-r">Transactions</div>
          <div className="px-2 py-1.5 flex items-center justify-center">
            <div className="bg-zinc-100 px-2 py-0.5 rounded-full text-xs">
              {transactions.length}
            </div>
          </div>
        </h2>
        <AddTransaction />
      </div>
      <div className="border w-full overflow-hidden rounded-md">
        <div className="flex text-left text-sm  overflow-hidden dark:border-zinc-800">
          <div className="flex-1 border-b p-4 bg-zinc-50 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-300 font-semibold dark:border-zinc-800">
            Name
          </div>
          <div className="flex-1 border-b p-4 bg-zinc-50 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-300 font-semibold dark:border-zinc-800">
            Amount
          </div>
          <div className="flex-1 hidden border-b p-4 bg-zinc-50 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-300 font-semibold dark:border-zinc-800 md:table-cell">
            Type
          </div>
          <div className="flex-2 hidden border-b p-4 bg-zinc-50 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-300 font-semibold dark:border-zinc-800 sm:table-cell">
            Category
          </div>
          <div className="whitespace-nowrap flex-1 hidden border-b p-4 bg-zinc-50 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-300 font-semibold dark:border-zinc-800 lg:table-cell">
            Date created
          </div>
          <div className="flex-1 text-right border-b p-4 bg-zinc-50 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-300 font-semibold dark:border-zinc-800">
            Actions
          </div>
        </div>
        {transactionsPerPageRows.length ? (
          transactionsPerPageRows.map(
            (transaction): JSX.Element => (
              <TransactionTableItem transaction={transaction} />
            )
          )
        ) : (
          <div className="flex flex-col gap-2 items-center justify-center p-24">
            <FiFilePlus size="2rem" className="stroke-zinc-300" />
            <div className="text-xl font-bold text-zinc-700">
              No transactions
            </div>
            <div className="text-sm text-zinc-500 mb-2">
              Get started by creating transaction.
            </div>
            <AddTransaction />
          </div>
        )}
      </div>

      <div className="mt-4 flex justify-between">
        <div className="flex gap-4 items-center">
          <select
            className="text-zinc-900 bg-zinc-50 shadow-sm rounded-md border border-zinc-300 px-3 pr-7 py-1.5 text-sm focus:ring-emerald-500 focus:border-emerald-500 focus:outline-0 dark:bg-zinc-900 dark:text-zinc-100 dark:border-zinc-800"
            id="select"
            name="select"
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
          >
            {ROWS_PER_PAGE.map((row) => (
              <option key={row} value={row}>
                {row}
              </option>
            ))}
          </select>
          <span className="hidden text-sm text-zinc-500 sm:inline">
            Rows per page
          </span>
        </div>
        <div className="flex bg-white border border-zinc-300 rounded-md overflow-hidden shadow-sm dark:bg-zinc-900 dark:border-zinc-800">
          <button
            className="text-sm py-1.5 px-3 flex items-center justify-center bg-zinc-50 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            type="button"
            disabled={page === 0}
            onClick={handlePreviousPageSet}
          >
            <FiArrowLeft className="stroke-zinc-500 dark:stroke-zinc-400" />
          </button>
          <div className="w-px h-full bg-zinc-300 dark:bg-zinc-800" />
          <button
            className="text-sm py-1.5 px-3 flex items-center justify-center bg-zinc-50 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            type="button"
            disabled={page + 1 === totalPages}
            onClick={handleNextPageSet}
          >
            <FiArrowRight className="stroke-zinc-500 dark:stroke-zinc-400" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionTable;
