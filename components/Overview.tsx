import OverviewCard from "./OverviewCard";
import CoinIcon from "../assets/icons/coin.svg";
import FireIcon from "../assets/icons/fire.svg";
import PigIcon from "../assets/icons/pig.svg";

interface Props {
  income: { total: number; numberOfTransactions: number };
  expense: { total: number; numberOfTransactions: number };
  availableBalance: { total: number; percentage: number };
}

const Overview = ({
  income,
  expense,
  availableBalance,
}: Props): JSX.Element => {
  return (
    <div className="overview">
      <div>
        <h2>Overview</h2>
      </div>
      <div className="overview-cards">
        <OverviewCard
          icon={<CoinIcon />}
          primaryValue={income.total}
          secondaryValue={income.numberOfTransactions}
          primaryDescription="Income"
          secondaryDescription="Transactions"
        />
        <OverviewCard
          icon={<FireIcon />}
          primaryValue={expense.total}
          secondaryValue={expense.numberOfTransactions}
          primaryDescription="Expense"
          secondaryDescription="Transactions"
        />
        <OverviewCard
          icon={<PigIcon />}
          primaryValue={availableBalance.total}
          secondaryValue={availableBalance.percentage}
          primaryDescription="Available"
          secondaryDescription="Percentage"
        />
      </div>
    </div>
  );
};

export default Overview;
