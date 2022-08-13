import * as React from "react";
import UpdateTransaction from "./UpdateTransaction";
import { DATE_FORMAT } from "../util/dateTimeUtils";
import Select from "./Select";
import IconButton from "./IconButton";
import ArrowLeftIcon from "../assets/icons/arrow-left.svg";
import ArrowRightIcon from "../assets/icons/arrow-right.svg";
import { useGlobalContext } from "../context/GlobalContext";
import TransactionsTableActions from "./TransactionsTableActions";

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
    <div className="transactions">
      <h2>Transactions ({transactions.length})</h2>
      <table className="transactions-table">
        <tbody>
          {transactionsPerPageRows.map((transaction) => (
            <tr key={transaction.id}>
              <td>
                <TransactionsTableActions transaction={transaction} />
              </td>
              <td>{transaction.name}</td>
              <td>{transaction.type}</td>
              <td>{DATE_FORMAT.format(new Date(transaction.dateCreated))}</td>
              <td>{transaction.category}</td>
              <td>
                {transaction.value.toFixed(2)}{" "}
                <span className="currency">BAM</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="transactions-table-footer">
        <div className="transactions-table-footer-rows-per-page">
          <span>Rows per page</span>
          <Select value={rowsPerPage} onChange={handleRowsPerPageChange}>
            {ROWS_PER_PAGE.map(
              (rowPerPage): JSX.Element => (
                <option key={rowPerPage} value={rowPerPage}>
                  {rowPerPage}
                </option>
              )
            )}
          </Select>
        </div>
        <div className="transactions-table-footer-page-actions">
          <IconButton
            variant="secondary"
            disabled={page === 0}
            onClick={handlePreviousPageSet}
            icon={<ArrowLeftIcon />}
          />
          <IconButton
            variant="secondary"
            disabled={page + 1 === totalPages}
            onClick={handleNextPageSet}
            icon={<ArrowRightIcon />}
          />
        </div>
      </div>
    </div>
  );
};

export default TransactionTable;
