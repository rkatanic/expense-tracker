import OverviewCard from "./OverviewCard";
import CoinIcon from "../assets/icons/coin.svg";
import FireIcon from "../assets/icons/fire.svg";
import PigIcon from "../assets/icons/pig.svg";
import { useGlobalContext } from "../context/GlobalContext";

const Overview = (): JSX.Element => {
  const {
    data: { income, expense, availableBalance },
  } = useGlobalContext();

  return (
    <div className="flex gap-4 flex-wrap">
      <div className="overflow-hidden border bg-white rounded-md shadow-sm dark:bg-zinc-800 dark:border-zinc-700 w-full flex-0 md:flex-1">
        <div className="flex items-center gap-4 mb-2 p-4">
          <div className="w-12 h-12 bg-gradient-to-b from-emerald-400 to-teal-500 rounded-md flex items-center justify-center dark:from-emerald-600 dark:to-teal-700">
            <svg
              className="stroke-white"
              fill="none"
              height="1.25rem"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="1.25rem"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
              <polyline points="17 6 23 6 23 12" />
            </svg>
          </div>
          <div>
            <h3 className="text-emerald-500">Income</h3>
            <h1 className="text-2xl font-bold dark:text-zinc-200 whitespace-nowrap">
              {income.total}
              <span className="ml-1 text-sm text-zinc-400 font-normal dark:text-zinc-500">
                BAM
              </span>
            </h1>
          </div>
        </div>
        <div className="bg-zinc-50 p-4 font-medium border-t text-zinc-500 dark:bg-zinc-700/40 dark:text-zinc-400 dark:border-zinc-700 ">
          <span>{income.numberOfTransactions}</span>
          <span className="ml-1 text-sm">
            {income.numberOfTransactions === 1 ? "Transaction" : "Transactions"}
          </span>
        </div>
      </div>

      <div className="overflow-hidden border bg-white rounded-md shadow-sm dark:bg-zinc-800 dark:border-zinc-700 w-full flex-0 md:flex-1">
        <div className="flex items-center gap-4 mb-2 p-4">
          <div className="w-12 h-12 bg-gradient-to-b from-red-400 to-rose-500 rounded-md flex items-center justify-center dark:from-red-600 dark:to-rose-700">
            <svg
              className="stroke-white"
              fill="none"
              height="1.25rem"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="1.25rem"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
              <polyline points="17 18 23 18 23 12" />
            </svg>
          </div>
          <div>
            <h3 className="text-rose-500">Expense</h3>
            <h1 className="text-2xl font-bold dark:text-zinc-200 whitespace-nowrap">
              {expense.total}
              <span className="ml-1 text-sm text-zinc-400 font-normal dark:text-zinc-500">
                BAM
              </span>
            </h1>
          </div>
        </div>
        <div className="bg-zinc-50 p-4 font-medium border-t text-zinc-500 dark:bg-zinc-700/40 dark:text-zinc-400 dark:border-zinc-700 ">
          <span>{expense.numberOfTransactions}</span>
          <span className="ml-1 text-sm">
            {expense.numberOfTransactions === 1
              ? "Transaction"
              : "Transactions"}
          </span>
        </div>
      </div>

      <div className="overflow-hidden border bg-white rounded-md shadow-sm dark:bg-zinc-800 dark:border-zinc-700 w-full flex-0 md:flex-1">
        <div className="flex items-center gap-4 mb-2 p-4">
          <div className="w-12 h-12 bg-gradient-to-b from-slate-400 to-zinc-500 rounded-md flex items-center justify-center dark:from-slate-600 dark:to-zinc-700">
            <svg
              className="stroke-white"
              fill="none"
              height="1.25rem"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="1.25rem"
              xmlns="http://www.w3.org/2000/svg"
            >
              <desc />
              <path d="M0 0h24v24H0z" fill="none" stroke="none" />
              <line x1="7" x2="17" y1="20" y2="20" />
              <path d="M6 6l6 -1l6 1" />
              <line x1="12" x2="12" y1="3" y2="20" />
              <path d="M9 12l-3 -6l-3 6a3 3 0 0 0 6 0" />
              <path d="M21 12l-3 -6l-3 6a3 3 0 0 0 6 0" />
            </svg>
          </div>
          <div>
            <h3 className="text-slate-500 whitespace-nowrap">
              Available balance
            </h3>
            <h1 className="text-2xl font-bold dark:text-zinc-200 whitespace-nowrap">
              {availableBalance.total}
              <span className="ml-1 text-sm text-zinc-400 font-normal dark:text-zinc-500">
                BAM
              </span>
            </h1>
          </div>
        </div>
        <div className="bg-zinc-50 p-4 font-medium border-t text-zinc-500 dark:bg-zinc-700/40 dark:text-zinc-400 dark:border-zinc-700 ">
          <span>{availableBalance.percentage}%</span>
          <span className="ml-1 text-sm">Remaining</span>
        </div>
      </div>
    </div>
  );
};

export default Overview;
