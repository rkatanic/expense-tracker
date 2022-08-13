import React, { createContext, useContext, useState } from "react";
import { getAllTransactionsInDateRange } from "../api/transactionsApi";
import { Transaction } from "../types/Transaction";

const INITIAL_DATA = {
  transactions: [] as Transaction[],
  income: {
    total: 0,
    numberOfTransactions: 0,
  },
  expense: { total: 0, numberOfTransactions: 0 },
  availableBalance: {
    total: 0,
    percentage: 0,
  },
};

var date = new Date(),
  year = date.getFullYear(),
  month = date.getMonth();
var firstDayOfCurrentMonthDate = new Date(year, month, 1);
var currentDayOfMonthDate = new Date();

const globalContext = createContext({
  dateRange: { start: firstDayOfCurrentMonthDate, end: currentDayOfMonthDate },
  isLoading: false,
  data: INITIAL_DATA,
  useSetIsLoading: (isLoading: boolean) => {},
  useSetStartDate: (date: Date) => {},
  useSetEndDate: (date: Date) => {},
  useFetchData: () => {},
});

export const GlobalContextProvider = ({ children }: any): JSX.Element => {
  const [dateRange, setDateRange] = useState({
    start: firstDayOfCurrentMonthDate,
    end: currentDayOfMonthDate,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(INITIAL_DATA);

  const useSetIsLoading = (isLoading: boolean): void => {
    setIsLoading(isLoading);
  };

  const useSetStartDate = (date: Date) => {
    setDateRange((prevState) => ({ ...prevState, start: date }));
  };

  const useSetEndDate = (date: Date) => {
    setDateRange((prevState) => ({ ...prevState, end: date }));
  };

  const useFetchData = async (): Promise<void> => {
    setIsLoading(true);
    const res = await getAllTransactionsInDateRange(
      dateRange.start.getTime(),
      dateRange.end.getTime()
    );

    setData({ transactions: res.data, ...res });
    setIsLoading(false);
  };

  return (
    <globalContext.Provider
      value={{
        dateRange,
        isLoading,
        data,
        useSetIsLoading,
        useSetStartDate,
        useSetEndDate,
        useFetchData,
      }}
    >
      {children}
    </globalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(globalContext);
