import { Transaction } from "../types/Transaction";
import { db } from "./firebaseAdmin";

const COLLECTION_NAME = "transactions";
const collection = db.collection(COLLECTION_NAME);

export const getAllTransactionsInDateRange = async (
  userId: string,
  startDate: number,
  endDate: number
): Promise<FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>> => {
  return await collection
    .where("userId", "==", userId)
    .where("dateCreated", ">=", startDate)
    .where("dateCreated", "<=", endDate)
    .get();
};

export const createTransaction = async (
  data: any
): Promise<
  FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>
> => {
  return await collection.add(data);
};

export const updateTransaction = async (
  id: string,
  transaction: Transaction
): Promise<void> => {
  await collection.doc(id).set(transaction, { merge: true });
};

export const deleteTransaction = async (id: string): Promise<void> => {
  await collection.doc(id).delete();
};
