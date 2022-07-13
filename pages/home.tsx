import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthUserContext";
import TransactionTable from "../components/TransactionsTable";
import AddTransactionModal from "../components/AddTransactionModal";
import { getAllTransactionsInDateRange } from "../api/transactionsApi";
import Overview from "../components/Overview";

var date = new Date(),
  year = date.getFullYear(),
  month = date.getMonth();
var firstDay = new Date(year, month, 1).getTime();
var lastDay = new Date(year, month + 1, 0).getTime();

const Home = () => {
  const { authUser, logout } = useAuth();
  const router = useRouter();
  const [data, setData] = useState({
    transactions: [],
    income: {
      total: 0,
      numberOfTransactions: 0,
    },
    expense: { total: 0, numberOfTransactions: 0 },
    availableBalance: {
      total: 0,
      percentage: 0,
    },
  });
  const [{ startDate, endDate }, setDateRange] = useState({
    startDate: firstDay,
    endDate: lastDay,
  });

  useEffect((): void => {
    if (!authUser) router.push("/");
  }, [authUser, router]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async (): Promise<void> => {
    const res = await getAllTransactionsInDateRange(startDate, endDate);
    setData({ transactions: res.data, ...res });
    console.log(data);
  };

  if (!authUser) return null;

  return (
    <div className="home">
      <Overview
        income={data.income}
        expense={data.expense}
        availableBalance={data.availableBalance}
      />
      <TransactionTable transactions={data.transactions} />
      <AddTransactionModal />
      <div></div>
      <button onClick={logout}>logout</button>
    </div>
  );
};

export default Home;
