interface StyledSelectProps {
  name?: string;
  value: string;
  handleChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  label?: string;
  defaultLabel: string;
  items: any;
  readOnly?: boolean;
  className?: string;
  required?: boolean;
  description?: string;
}

const StyledSelect: React.FC<StyledSelectProps> = ({
  name,
  value,
  label = "",
  defaultLabel,
  items,
  handleChange,
  readOnly = false,
  className = "",
  required = false,
  description = "",
}) => {
  return (
    <div className="w-full flex flex-col">
      {label && (
        <label className="text-sm font-bold text-black">
          {label} {required && <span className="text-danger">*</span>}
        </label>
      )}
      <select
        name={name}
        value={value}
        onChange={handleChange}
        className={`rounded-lg bg-white border ${
          className ? className : "text-black py-2 px-3"
        } w-full focus:outline-0 cursor-pointer`}
        disabled={readOnly}
      >
        <option value="" disabled>
          Select {defaultLabel}
        </option>
        {items.map((item: any) => (
          <option key={item.key} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
      {description && (
        <span className="text-sm text-gray-500">{description}</span>
      )}
    </div>
  );
};

export { StyledSelect };
