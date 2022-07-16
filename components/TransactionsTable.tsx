import * as React from "react";
import { Transaction } from "../types/Transaction";
import UpdateTransactionModal from "./UpdateTransaction";
import { DATE_FORMAT } from "../util/dateTimeUtils";

interface Props {
  transactions: Transaction[];
}

const TransactionTable = ({ transactions }: Props): JSX.Element => {
  return (
    <div className="transactions">
      <h2>Transactions</h2>
      <table className="transactions-table">
        <tbody>
          {transactions.map((transaction) => (
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
    </div>
  );
};

export default TransactionTable;
