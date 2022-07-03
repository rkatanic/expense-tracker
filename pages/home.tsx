import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthUserContext";
import axios from "axios";
import { getCookie } from "../util/utils";

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
  }, [authUser]);

  if (!authUser) return null;

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    const res = await axios.get("/api/transactions", {
      headers: {
        authorization: getCookie("token") as any,
      },
      params: {
        startDate,
        endDate,
      },
    });
    setTransactions(res.data.data);
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

  return (
    <div>
      logged in page
      <div className="transaction">
        <div>
          {transactions.map((transaction: any) => (
            <div key={transaction.id}>
              <p>{transaction.name}</p>
              <p>{transaction.type}</p>
              <p>{transaction.value}</p>
              <p>{new Date(transaction.dateCreated).toString()}</p>
              <button onClick={() => deleteTransaction(transaction.id)}>
                delete
              </button>
            </div>
          ))}
        </div>
        <div>
          <button onClick={createTransaction}>create new transaction</button>
          <div>
            <label htmlFor="INCOME">INCOME</label>
            <input
              type="radio"
              id="INCOME"
              name="fav_language"
              value="INCOME"
            />
          </div>
          <div>
            <label htmlFor="OUTCOME">OUTCOME</label>
            <input
              type="radio"
              id="OUTCOME"
              name="fav_language"
              value="OUTCOME"
            />
          </div>
          <input type="text" placeholder="Name" />
          <input type="number" placeholder="Value" />
          <input type="date" />
        </div>
      </div>
      <button onClick={logout}>logout</button>
    </div>
  );
};

export default Home;
