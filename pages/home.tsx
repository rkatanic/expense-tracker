import { EffectCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthUserContext";
import TransactionTable from "../components/TransactionsTable";
import Overview from "../components/Overview";
import Actions from "../components/Actions";
import Input from "../components/Input";
import ReloadIcon from "../assets/icons/reload.svg";
import IconButton from "../components/IconButton";
import { useGlobalContext } from "../context/GlobalContext";

const Home = (): JSX.Element | null => {
  const {
    dateRange: { start, end },
    isLoading,
    useSetStartDate,
    useSetEndDate,
    useFetchData,
  } = useGlobalContext();
  const { authUser } = useAuth();
  const router = useRouter();

  useEffect((): ReturnType<EffectCallback> => {
    if (!authUser) router.push("/");
  }, [authUser, router]);

  useEffect((): ReturnType<EffectCallback> => {
    useFetchData();
  }, []);

  if (!authUser) return null;

  return (
    <div className="home">
      <div className="home-actions">
        <Actions />
        <div className="home-date-range">
          <IconButton
            disabled={isLoading}
            icon={<ReloadIcon />}
            onClick={useFetchData}
          />
          <Input
            type="date"
            onChange={(e) => useSetStartDate(new Date(e.target.value))}
            value={start.toISOString().substring(0, 10)}
          />
          <Input
            type="date"
            onChange={(e) => useSetEndDate(new Date(e.target.value))}
            value={end.toISOString().substring(0, 10)}
          />
        </div>
      </div>
      <Overview />
      <TransactionTable />
    </div>
  );
};

export default Home;
