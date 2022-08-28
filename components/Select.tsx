interface Props {
  value: any;
  onChange: (e: any) => void;
  children: React.ReactNode;
  label?: string;
  name?: string;
}

const Select = ({
  value,
  onChange,
  children,
  label,
  name,
}: Props): JSX.Element => (
  <div>
    {label && (
      <label
        className="block mb-1 text-sm font-semibold text-zinc-900 dark:text-zinc-400"
        htmlFor={name}
      >
        {label}
      </label>
    )}
    <select
      data-testid="select"
      className="w-full text-zinc-900 rounded-md border bg-zinc-50 border-zinc-300 px-3 pr-9 py-1.5 text-sm focus:ring-emerald-500  focus:outline-0 dark:text-zinc-100 dark:bg-zinc-900 dark:border-zinc-500"
      value={value}
      onChange={onChange}
    >
      {children}
    </select>
  </div>
);

export default Select;
