import { FiLogOut } from "react-icons/fi";
import { VscColorMode } from "react-icons/vsc";
import { useAuth } from "../context/AuthUserContext";

const Navbar = (): JSX.Element => {
  const { logout: handleSignOut } = useAuth();

  const handleDarkThemeSwitch = (): void => {
    if (document.body.classList.contains("dark")) {
      document.body.classList.remove("dark");
    } else {
      document.body.classList.add("dark");
    }
  };

  return (
    <div className="overflow-y-auto p-4 w-full h-screen max-w-xs bg-zinc-100 border-r flex flex-col justify-between gap-8 dark:bg-zinc-800 dark:border-zinc-700">
      <div className="flex flex-col gap-8">
        <div className="flex gap-4 items-center">
          <div className="w-8 h-8 rounded-full border-8 border-emerald-500" />
          <span className="text-2xl font-black text-zinc-600 dark:text-zinc-200">
            DimeFlow
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-xs text-zinc-400 font-semibold tracking-wider dark:text-zinc-500">
            PAGES
          </span>
          <p className="flex gap-4 items-center font-semibold text-zinc-600 rounded-md p-2 bg-zinc-200 cursor-pointer dark:bg-zinc-700 dark:text-zinc-400">
            <svg
              className="stroke-zinc-600 dark:stroke-zinc-400"
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
              <line x1="8" x2="21" y1="6" y2="6" />
              <line x1="8" x2="21" y1="12" y2="12" />
              <line x1="8" x2="21" y1="18" y2="18" />
              <line x1="3" x2="3.01" y1="6" y2="6" />
              <line x1="3" x2="3.01" y1="12" y2="12" />
              <line x1="3" x2="3.01" y1="18" y2="18" />
            </svg>
            Transactions
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-xs text-zinc-400 font-semibold tracking-wider dark:text-zinc-500">
            SETTINGS
          </span>
          <label
            className="inline-flex relative items-center cursor-pointer mt-2"
            htmlFor="theme-switch"
          >
            <input
              className="sr-only peer"
              id="theme-switch"
              type="checkbox"
              value=""
            />
            <div className="w-9 h-5 bg-zinc-200 peer-focus:outline-none peer-focus:ring-0 rounded-full peer dark:bg-zinc-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-zinc-600 peer-checked:bg-emerald-600" />
            <span className="ml-4 text-sm font-semibold text-zinc-600 dark:text-zinc-400">
              Dark mode
            </span>
          </label>
        </div>
        <div className="flex flex-col gap-3">
          <span className="text-xs text-zinc-400 font-semibold tracking-wider dark:text-zinc-500">
            CATEGORIES
          </span>
          <div className="font-semibold text-zinc-600 text-sm flex gap-4 items-center dark:text-zinc-400">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            Income
          </div>
          <div className="font-semibold text-zinc-600 text-sm flex gap-4 items-center dark:text-zinc-400">
            <div className="w-2.5 h-2.5 rounded-full bg-sky-500" />
            Food & Drinks
          </div>
          <div className="font-semibold text-zinc-600 text-sm flex gap-4 items-center dark:text-zinc-400">
            <div className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
            Electricity
          </div>
          <div className="font-semibold text-zinc-600 text-sm flex gap-4 items-center dark:text-zinc-400">
            <div className="w-2.5 h-2.5 rounded-full bg-lime-500" />
            Medicine
          </div>
          <div className="font-semibold text-zinc-600 text-sm flex gap-4 items-center dark:text-zinc-400">
            <div className="w-2.5 h-2.5 rounded-full bg-pink-500" />
            Internet
          </div>
          <div className="font-semibold text-zinc-600 text-sm flex gap-4 items-center dark:text-zinc-400">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
            Telephone
          </div>
          <div className="font-semibold text-zinc-600 text-sm flex gap-4 items-center dark:text-zinc-400">
            <div className="w-2.5 h-2.5 rounded-full bg-orange-400" />
            Housing
          </div>
          <div className="font-semibold text-zinc-600 text-sm flex gap-4 items-center dark:text-zinc-400">
            <div className="w-2.5 h-2.5 rounded-full bg-zinc-700 dark:bg-white" />
            Fuel
          </div>
          <div className="font-semibold text-zinc-600 text-sm flex gap-4 items-center dark:text-zinc-400">
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
            Tech
          </div>
          <div className="font-semibold text-zinc-600 text-sm flex gap-4 items-center dark:text-zinc-400">
            <div className="w-2.5 h-2.5 rounded-full bg-zinc-400" />
            Other
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-xs text-zinc-400 font-semibold tracking-wider dark:text-zinc-500">
          ACTIONS
        </span>
        <p
          onClick={handleSignOut}
          className="flex gap-4 items-center text-sm font-semibold text-zinc-600 rounded-md p-2 hover:bg-zinc-200 cursor-pointer dark:hover:bg-zinc-700 dark:text-zinc-400"
        >
          <svg
            className="stroke-zinc-600 dark:stroke-zinc-400"
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
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" x2="9" y1="12" y2="12" />
          </svg>
          Sign out
        </p>
      </div>
    </div>
  );
};

export default Navbar;
