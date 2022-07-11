import {
  createTransaction,
  getAllTransactionsInDateRange,
} from "../../../lib/dataBaseQueries";
import { withAuth } from "../../../lib/middleware/withAuth";
import { Transaction, TransactionType } from "../../../types/Transaction";

const handler = async (req: any, res: any): Promise<any> => {
  try {
    if (req.method === "GET") {
      const transactions = await getAllTransactionsInDateRange(
        req.uid,
        +req.query.startDate,
        +req.query.endDate
      );
      const income = { total: 0, numberOfTransactions: 0 };
      const expense = { total: 0, numberOfTransactions: 0 };
      const availableBalance = { total: 0, percentage: 0 };

      const data: Transaction[] = transactions.docs.map((doc) => {
        const {
          name,
          value,
          userId,
          type,
          expenseType,
          category,
          dateCreated,
          dateModified,
        } = doc.data();

        if (type === TransactionType.EXPENSE) {
          expense.total += doc.data().value;
          expense.numberOfTransactions += 1;
        }
        if (type === TransactionType.INCOME) {
          income.total += doc.data().value;
          income.numberOfTransactions += 1;
        }

        return {
          id: doc.id,
          userId,
          name,
          value,
          type,
          expenseType,
          category,
          dateCreated,
          dateModified,
        };
      });

      availableBalance.total =
        income.total - expense.total > 0 ? income.total - expense.total : 0;

      availableBalance.percentage =
        availableBalance.total / income.total > 0
          ? (availableBalance.total / income.total) * 100
          : 0;

      res.status(200).json({
        data,
        expense,
        income,
        availableBalance,
      });
    } else if (req.method === "POST") {
      return res.status(200).json(createTransaction(req.body));
    }
  } catch (e) {
    res.status(400).end();
  }
};

export default withAuth({ handler });
