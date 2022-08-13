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
    <div className="overview">
      <h2>Overview</h2>
      <div className="overview-cards">
        <OverviewCard
          icon={<CoinIcon />}
          primaryValue={income?.total}
          secondaryValue={income?.numberOfTransactions}
          primaryDescription="Income"
          secondaryDescription="Transactions"
        />
        <OverviewCard
          icon={<FireIcon />}
          primaryValue={expense?.total}
          secondaryValue={expense?.numberOfTransactions}
          primaryDescription="Expense"
          secondaryDescription="Transactions"
        />
        <OverviewCard
          icon={<PigIcon />}
          primaryValue={availableBalance?.total}
          secondaryValue={availableBalance?.percentage}
          primaryDescription="Available"
          secondaryDescription="Percentage"
        />
      </div>
    </div>
  );
};

export default Overview;
