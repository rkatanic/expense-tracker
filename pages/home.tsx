import { EffectCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthUserContext";
import TransactionTable from "../components/TransactionsTable";
import Overview from "../components/Overview";
import Actions from "../components/Actions";
import Input from "../components/Input";
import ReloadIcon from "../assets/icons/reload.svg";
import IconButton from "../components/IconButton";
import { useGlobalContext } from "../context/GlobalContext";
import Sidenav from "../components/Sidenav";
import Button from "../components/Button";
import { FiMenu } from "react-icons/fi";

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

  const [showMenu, setShowMenu] = useState(false);

  const handleShowMenuToggle = (): void => {
    setShowMenu((prevState) => !prevState);
  };

  useEffect((): ReturnType<EffectCallback> => {
    if (!authUser) router.push("/");
  }, [authUser, router]);

  useEffect((): ReturnType<EffectCallback> => {
    useFetchData();
  }, []);

  if (!authUser) return null;

  return (
    <div className="h-screen flex overflow-hidden dark:bg-zinc-800">
      <Sidenav showMenu={showMenu} toggleShowMenu={handleShowMenuToggle} />
      <div className="w-full mx-auto overflow-y-auto">
        <div className="border-b flex items-center h-16 dark:border-zinc-700">
          <div className="max-w-5xl w-full m-auto flex items-center justify-between px-4">
            <h1 className="hidden xl:block text-lg font-semibold dark:text-zinc-200">
              Transactions
            </h1>
            <button
              className="xl:hidden"
              type="button"
              onClick={handleShowMenuToggle}
            >
              <FiMenu size="1.5rem" className="dark:stroke-zinc-400" />
            </button>

            <div className="flex justify-between">
              <div className="home-date-range">
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
                <Button onClick={useFetchData} text="Apply" />
              </div>
            </div>
          </div>
        </div>

        <div className="m-auto max-w-5xl mt-8 px-4">
          <Overview />
          <TransactionTable />
        </div>
      </div>
    </div>
  );
};

export default Home;
