import { useGlobalContext } from "../context/GlobalContext";
import { TbScale } from "react-icons/tb";
import { FiTrendingUp, FiTrendingDown } from "react-icons/fi";

const Overview = (): JSX.Element => {
  const {
    data: { income, expense, availableBalance },
  } = useGlobalContext();

  return (
    <div className="flex gap-4 flex-wrap">
      <div className="overflow-hidden border bg-white rounded-md shadow-sm dark:bg-zinc-800 dark:border-zinc-700 w-full flex-0 md:flex-1">
        <div className="flex items-center gap-4 mb-2 p-4">
          <div className="w-12 h-12 bg-gradient-to-b from-emerald-400 to-teal-500 rounded-md flex items-center justify-center dark:from-emerald-600 dark:to-teal-700">
            <FiTrendingUp className="stroke-white" />
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
            <FiTrendingDown className="stroke-white" />
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
            <TbScale className="stroke-white" />
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
