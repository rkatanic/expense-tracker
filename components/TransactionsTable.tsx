import * as React from "react";
import UpdateTransaction from "./UpdateTransaction";
import { DATE_FORMAT } from "../util/dateTimeUtils";
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
    useFetchData,
    data: { transactions },
  } = useGlobalContext();

  const [rowsPerPage, setRowsPerPage] = React.useState(ROWS_PER_PAGE[0]);
  const [page, setPage] = React.useState(0);
  const [showCreateTransaction, setShowCreateTransaction] =
    React.useState(false);
  const [showUpdateModal, setShowUpdateModal] = React.useState(false);
  const [showDeletetionModal, setShowDeletionModal] = React.useState(false);
  const [selectedTransaction, setTransaction] = React.useState<
    Transaction | undefined
  >(undefined);

  const handleSetTransaction = (transaction: Transaction): void => {
    setTransaction(transaction);
  };

  const handleShowUpdateModalToggle = (): void => {
    setShowUpdateModal((prevState) => !prevState);
  };

  const handleShowDeletionModalToggle = (): void => {
    setShowDeletionModal((prevState) => !prevState);
  };

  const deleteTransaction = async (transactionId: string): Promise<void> => {
    handleShowDeletionModalToggle();
    await deleteTransaction(transactionId);
    useFetchData();
  };

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

  const handleTransactionEdit = (transaction: Transaction): void => {
    handleSetTransaction(transaction);
    handleShowUpdateModalToggle();
  };

  const handleTransactionDelete = (transaction: Transaction): void => {
    handleSetTransaction(transaction);
    handleShowDeletionModalToggle();
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
      <table className="w-full overflow-hidden rounded-md shadow-sm">
        <tbody className="text-left text-sm border overflow-hidden dark:border-zinc-800">
          <tr>
            <th className="border-b p-4 bg-zinc-50 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-300 font-semibold dark:border-zinc-800">
              Name
            </th>
            <th className="border-b p-4 bg-zinc-50 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-300 font-semibold dark:border-zinc-800">
              Amount
            </th>
            <th className="hidden border-b p-4 bg-zinc-50 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-300 font-semibold dark:border-zinc-800 md:table-cell">
              Type
            </th>
            <th className="hidden border-b p-4 bg-zinc-50 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-300 font-semibold dark:border-zinc-800 sm:table-cell">
              Category
            </th>
            <th className="hidden border-b p-4 bg-zinc-50 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-300 font-semibold dark:border-zinc-800 lg:table-cell">
              Date created
            </th>
            <th className="text-right border-b p-4 bg-zinc-50 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-300 font-semibold dark:border-zinc-800">
              Actions
            </th>
          </tr>
          {transactionsPerPageRows.map(
            (transaction): JSX.Element => (
              <TransactionTableItem
                transaction={transaction}
                editTransaction={() => handleTransactionEdit(transaction)}
                deleteTransaction={() => handleTransactionDelete(transaction)}
              />
            )
          )}
        </tbody>
      </table>
      <TransactionDeleteModal
        isOpen={showDeletetionModal}
        onClose={handleShowDeletionModalToggle}
        transactionName={selectedTransaction?.name as string}
        onDelete={(): Promise<void> =>
          deleteTransaction(selectedTransaction?.id as string)
        }
      />
      <UpdateTransaction
        isOpen={showUpdateModal}
        transaction={selectedTransaction as Transaction}
        onClose={handleShowUpdateModalToggle}
      />
      <div className="mt-4 flex justify-between">
        <div className="flex gap-4 items-center">
          <select
            className="text-zinc-900 shadow-sm rounded-md border border-zinc-300 px-3 pr-7 py-2 text-sm focus:ring-emerald-500 focus:border-emerald-500 focus:outline-0 dark:bg-zinc-900 dark:text-zinc-100 dark:border-zinc-800"
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
        <div className="flex bg-white border rounded-md overflow-hidden shadow-sm dark:bg-zinc-900 dark:border-zinc-800">
          <button
            className="text-sm py-3 px-4 flex items-center justify-center hover:bg-zinc-50 dark:hover:bg-zinc-800"
            type="button"
            disabled={page === 0}
            onClick={handlePreviousPageSet}
          >
            <FiArrowLeft className="stroke-zinc-500 dark:stroke-zinc-400" />
          </button>
          <div className="w-px h-full bg-zinc-200 dark:bg-zinc-800" />
          <button
            className="text-sm py-3 px-4 flex items-center justify-center hover:bg-zinc-50 dark:hover:bg-zinc-800"
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
