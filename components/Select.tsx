interface Props {
  value: any;
  onChange: (e: any) => void;
  children: React.ReactNode;
}

const Select = ({ value, onChange, children }: Props): JSX.Element => {
  return (
    <select
      data-testid="select"
      className="select"
      value={value}
      onChange={onChange}
    >
      {children}
    </select>
  );
};

export default Select;
