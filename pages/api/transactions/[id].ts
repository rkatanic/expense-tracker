import {
  deleteTransaction,
  updateTransaction,
} from "../../../lib/dataBaseQueries";
import { withAuth } from "../../../lib/middleware/withAuth";

const handler = async (req: any, res: any) => {
  const { id } = req.query;

  try {
    if (req.method === "DELETE") {
      await deleteTransaction(id);
    } else if (req.method === "PUT") {
      await updateTransaction(id, req.body);
    }
    res.status(200).end();
  } catch (e) {
    res.status(400).end();
  }
};

export default withAuth({ handler });
