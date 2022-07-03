import { createTransaction } from "../../../lib/db";
import { db } from "../../../lib/firebaseAdmin";
import { withAuth } from "../../../lib/middleware/withAuth";
import { Transaction } from "../../../types/Transaction";

const handler = async (req: any, res: any): Promise<any> => {
  const COLLECTION_NAME = "transactions";
  const collection = db.collection(COLLECTION_NAME);

  try {
    if (req.method === "GET") {
      const transactions = await collection
        .where("userId", "==", req.uid)
        .where("dateCreated", ">=", +req.query.startDate)
        .where("dateCreated", "<=", +req.query.endDate)
        .get();
      let totalOutcome = 0;
      let totalIncome = 0;

      const data: Transaction[] = transactions.docs.map((doc) => {
        const { name, value, userId, type, expenseType, dateCreated } =
          doc.data();

        if (type === "expense") {
          totalOutcome += doc.data().value;
        }
        if (type === "income") {
          totalIncome += doc.data().value;
        }

        return {
          id: doc.id,
          userId,
          name,
          value,
          type,
          expenseType,
          dateCreated,
        };
      });

      const availableBalance =
        totalIncome - totalOutcome > 0 ? totalIncome - totalOutcome : 0;

      res.status(200).json({
        data,
        totalOutcome,
        totalIncome,
        availableBalance,
      });
    } else if (req.method === "POST") {
      return res.status(200).json(
        createTransaction({
          userId: req.uid,
          name: "Salary",
          value: 1200,
          type: "income",
          dateCreated: new Date().getTime(),
        })
      );
    }
  } catch (e) {
    res.status(400).end();
  }
};

export default withAuth({ handler });
