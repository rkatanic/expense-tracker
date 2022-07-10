import axios from "axios";
import {
  createTransaction,
  deleteTransaction,
  getAllTransactionsInDateRange,
  updateTransaction,
} from "../../api/transactionsApi";
import {
  Category,
  Transaction,
  TransactionType,
} from "../../types/Transaction";
import { getCookie } from "../../util/utils";

jest.mock("axios");
jest.mock("util/utils.ts", () => ({ getCookie: jest.fn() }));

describe("transactionsApi", (): void => {
  describe("getAllTransactionsInDateRange", (): void => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should get all transactions in given date range", async (): Promise<void> => {
      (getCookie as jest.Mock).mockReturnValue("authorization token");
      const mockTransactions = ["transaction one", "transaction two"];
      (axios.get as jest.Mock).mockResolvedValue({
        data: { data: mockTransactions },
      });
      const mockStartDate = new Date().getTime();
      const mockEndDate = new Date().getTime();

      const response = await getAllTransactionsInDateRange(
        mockStartDate,
        mockEndDate
      );

      expect(axios.get).toHaveBeenNthCalledWith(1, "/api/transactions", {
        headers: {
          authorization: "authorization token",
        },
        params: {
          startDate: mockStartDate,
          endDate: mockEndDate,
        },
      });
      expect(response).toEqual(mockTransactions);
    });

    it("should return empty list when error occurs", async (): Promise<void> => {
      (getCookie as jest.Mock).mockReturnValue("authorization token");
      (axios.get as jest.Mock).mockRejectedValue("error");
      const mockStartDate = new Date().getTime();
      const mockEndDate = new Date().getTime();

      const response = await getAllTransactionsInDateRange(
        mockStartDate,
        mockEndDate
      );

      expect(axios.get).toHaveBeenNthCalledWith(1, "/api/transactions", {
        headers: {
          authorization: "authorization token",
        },
        params: {
          startDate: mockStartDate,
          endDate: mockEndDate,
        },
      });
      expect(response).toEqual([]);
    });
  });

  describe("createTransaction", (): void => {
    it("should create transaction", (): void => {
      (getCookie as jest.Mock).mockReturnValue("authorization token");
      const mockTransaction: Transaction = {
        userId: "userId",
        name: "Phone bill",
        value: 20,
        type: TransactionType.EXPENSE,
        category: Category.TELEPHONE,
        dateCreated: new Date().getTime(),
      };
      createTransaction(mockTransaction);

      expect(axios.post).toHaveBeenNthCalledWith(
        1,
        "/api/transactions",
        mockTransaction,
        {
          headers: {
            authorization: "authorization token",
          },
        }
      );
    });
  });

  describe("updateTransaction", (): void => {
    it("should delete transaction", (): void => {
      (getCookie as jest.Mock).mockReturnValue("authorization token");
      const mockTransaction: Transaction = {
        id: "transaction-id",
        userId: "userId",
        name: "Phone bill",
        value: 20,
        type: TransactionType.EXPENSE,
        category: Category.TELEPHONE,
        dateCreated: new Date().getTime(),
      };

      updateTransaction(mockTransaction);

      expect(axios.put).toHaveBeenNthCalledWith(
        1,
        `/api/transactions/transaction-id`,
        mockTransaction,
        {
          headers: {
            authorization: "authorization token",
          },
        }
      );
    });
  });

  describe("deleteTransaction", (): void => {
    it("should delete transaction", (): void => {
      (getCookie as jest.Mock).mockReturnValue("authorization token");
      const mockTransactionId = "transaction-id";
      deleteTransaction(mockTransactionId);

      expect(axios.delete).toHaveBeenNthCalledWith(
        1,
        `/api/transactions/${mockTransactionId}`,
        {
          headers: {
            authorization: "authorization token",
          },
        }
      );
    });
  });
});
