import { db } from "./firebaseAdmin";

export const createTransaction = async (
  data: any
): Promise<
  FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>
> => {
  return await db.collection("transactions").add({ ...data });
};
