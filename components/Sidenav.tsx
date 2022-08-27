import { useAuth } from "../context/AuthUserContext";
import { FiList, FiLogOut, FiX } from "react-icons/fi";

interface Props {
  showMenu: boolean;
  toggleShowMenu: () => void;
}

const Navbar = ({ showMenu, toggleShowMenu }: Props): JSX.Element => {
  const { logout: handleSignOut } = useAuth();

  const handleDarkThemeSwitch = (): void => {
    if (document.body.classList.contains("dark")) {
      document.body.classList.remove("dark");
    } else {
      document.body.classList.add("dark");
    }
  };

  return (
    <>
      {showMenu && (
        <div
          onClick={toggleShowMenu}
          className="fixed xl:hidden inset-0 bg-zinc-500/50 dark:bg-zinc-900/80"
        ></div>
      )}
      <div
        className={`${
          showMenu ? "left-0" : "-left-full"
        } z-10 transition-[left] duration-300 fixed xl:z-0 xl:relative xl:left-0 overflow-y-auto p-4 w-full h-screen max-w-xs bg-zinc-100 border-r flex flex-col justify-between gap-8 dark:bg-zinc-800 xl:dark:bg-zinc-700/40 dark:border-zinc-700`}
      >
        <div className="flex flex-col gap-8">
          <div className="flex gap-4 items-center justify-between">
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full border-8 border-emerald-500" />
              <span className="text-2xl font-black text-zinc-600 dark:text-zinc-200">
                DimeFlow
              </span>
            </div>
            <FiX
              size="1.5rem"
              className="xl:hidden dark:stroke-zinc-400"
              onClick={toggleShowMenu}
            />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-xs text-zinc-400 font-semibold tracking-wider dark:text-zinc-500">
              PAGES
            </span>
            <p className="before:absolute before:w-1 before:h-8 before:bg-orange-400 before:rounded-full before:left-2 flex gap-4 items-center font-semibold text-zinc-600 rounded-md p-2 bg-zinc-200 cursor-pointer dark:bg-zinc-700 dark:text-zinc-400">
              <FiList
                className="stroke-zinc-600 dark:stroke-zinc-400"
                size="1.25rem"
              />
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
                onChange={handleDarkThemeSwitch}
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
            <FiLogOut
              className="stroke-zinc-600 dark:stroke-zinc-400"
              size="1.25rem"
            />
            Sign out
          </p>
        </div>
      </div>
    </>
  );
};

export default Navbar;
