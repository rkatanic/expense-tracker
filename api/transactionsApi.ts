import axios from "axios";
import { Transaction } from "../types/Transaction";
import { getCookie } from "../util/utils";

export const getAllTransactionsInDateRange = async (
  startDate: number,
  endDate: number
): Promise<any> => {
  try {
    const response = await axios.get("/api/transactions", {
      headers: {
        authorization: getCookie("token") as any,
      },
      params: {
        startDate,
        endDate,
      },
    });
    return response.data;
  } catch (e) {
    return [];
  }
};

export const createTransaction = async (
  transaction: Transaction
): Promise<void> => {
  await axios.post("/api/transactions", transaction, {
    headers: {
      authorization: getCookie("token") as any,
    },
  });
};

export const updateTransaction = async (
  transaction: Transaction
): Promise<void> => {
  await axios.put(`/api/transactions/${transaction.id}`, transaction, {
    headers: {
      authorization: getCookie("token") as any,
    },
  });
};

export const deleteTransaction = async (id: string) => {
  await axios.delete(`/api/transactions/${id}`, {
    headers: {
      authorization: getCookie("token") as any,
    },
  });
};
