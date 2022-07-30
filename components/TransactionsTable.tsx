import * as React from "react";
import { Transaction } from "../types/Transaction";
import UpdateTransactionModal from "./UpdateTransaction";
import { DATE_FORMAT } from "../util/dateTimeUtils";
import Select from "./Select";

interface Props {
  transactions: Transaction[];
}

const ROWS_PER_PAGE = [5, 10, 15, 20];

const TransactionTable = ({ transactions }: Props): JSX.Element => {
  const [rowsPerPage, setRowsPerPage] = React.useState(ROWS_PER_PAGE[0]);
  const [page, setPage] = React.useState(0);

  const handleRowsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setRowsPerPage(+e.target.value);
  };

  return (
    <div className="transactions">
      <h2>Transactions</h2>
      <table className="transactions-table">
        <tbody>
          {(rowsPerPage > 0
            ? transactions.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
            : transactions
          ).map((transaction) => (
            <tr key={transaction.id}>
              <td>
                <UpdateTransactionModal transaction={transaction} />
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
      </div>
    </div>
  );
};

export default TransactionTable;
