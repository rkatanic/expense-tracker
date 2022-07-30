import { EffectCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthUserContext";
import TransactionTable from "../components/TransactionsTable";
import { getAllTransactionsInDateRange } from "../api/transactionsApi";
import Overview from "../components/Overview";
import Actions from "../components/Actions";
import Input from "../components/Input";
import ReloadIcon from "../assets/icons/reload.svg";
import IconButton from "../components/IconButton";

var date = new Date(),
  year = date.getFullYear(),
  month = date.getMonth();
var firstDay = new Date(year, month, 1);
var lastDay = new Date();

const Home = (): JSX.Element | null => {
  const { authUser } = useAuth();
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

  useEffect((): ReturnType<EffectCallback> => {
    if (!authUser) router.push("/");
  }, [authUser, router]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async (): Promise<void> => {
    const res = await getAllTransactionsInDateRange(
      startDate.getTime(),
      endDate.getTime()
    );
    setData({ transactions: res.data, ...res });
  };

  if (!authUser) return null;

  return (
    <div className="home">
      <div className="home-actions">
        <Actions />
        <div className="home-date-range">
          <IconButton icon={<ReloadIcon />} onClick={fetchTransactions} />
          <Input
            type="date"
            onChange={(e) =>
              setDateRange({ endDate, startDate: new Date(e.target.value) })
            }
            value={startDate.toISOString().substring(0, 10)}
          />
          <Input
            type="date"
            onChange={(e) =>
              setDateRange({ startDate, endDate: new Date(e.target.value) })
            }
            value={endDate.toISOString().substring(0, 10)}
          />
        </div>
      </div>
      <Overview
        income={data.income}
        expense={data.expense}
        availableBalance={data.availableBalance}
      />
      <TransactionTable transactions={data.transactions} />
    </div>
  );
};

export default Home;
