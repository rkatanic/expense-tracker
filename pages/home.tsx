import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthUserContext";
import axios from "axios";
import { getCookie } from "../util/utils";
import TransactionTable from "../components/TransactionsTable";
import AddTransactionModal from "../components/AddTransactionModal";
import { getAllTransactionsInDateRange } from "../api/transactionsApi";

var date = new Date(),
  year = date.getFullYear(),
  month = date.getMonth();
var firstDay = new Date(year, month, 1).getTime();
var lastDay = new Date(year, month + 1, 0).getTime();

const Home = () => {
  const { authUser, logout } = useAuth();
  const router = useRouter();
  const [transactions, setTransactions] = useState([]);
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
    setTransactions(res);
  };

  const deleteTransaction = async (id: string) => {
    await axios.delete(`/api/transactions/${id}`, {
      headers: {
        authorization: getCookie("token") as any,
      },
    });
    fetchTransactions();
  };

  const createTransaction = async () => {
    const res = await axios.post("/api/transactions", null, {
      headers: {
        authorization: getCookie("token") as any,
      },
    });
    console.log(res.data.data);
    fetchTransactions();
  };

  if (!authUser) return null;

  return (
    <div>
      logged in page
      <TransactionTable transactions={transactions} />
      <AddTransactionModal />
      <div></div>
      <button onClick={logout}>logout</button>
    </div>
  );
};

export default Home;
