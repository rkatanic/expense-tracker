import { db } from "../../../lib/firebaseAdmin";
import { withAuth } from "../../../lib/middleware/withAuth";

const handler = async (req: any, res: any) => {
  const { id } = req.query;

  try {
    if (req.method === "DELETE") {
      await db.collection("transactions").doc(id).delete();
    }
    res.status(200).end();
  } catch (e) {
    res.status(400).end();
  }
};

export default withAuth({ handler });
