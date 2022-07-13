interface Props {
  icon: JSX.Element;
  primaryValue: number;
  secondaryValue: number;
  primaryDescription: string;
  secondaryDescription: string;
}

const OverviewCard = ({
  icon,
  primaryValue,
  secondaryValue,
  primaryDescription,
  secondaryDescription,
}: Props): JSX.Element => {
  return (
    <div className="overview-card">
      <div className="overview-card-header">
        <div className="overview-card-icon">{icon}</div>
        <div className="overview-card-primary-text-wrapper">
          <div className="overview-card-primary-value">
            {primaryValue} <span className="overview-card-currency">BAM</span>
          </div>
          <div className="overview-card-primary-description">
            {primaryDescription}
          </div>
        </div>
      </div>
      <div className="overview-card-footer">
        <div className="overview-card-secondary-description">
          {secondaryDescription}
        </div>
        <div className="overview-card-secondary-value">{secondaryValue}</div>
      </div>
    </div>
  );
};

export default OverviewCard;
