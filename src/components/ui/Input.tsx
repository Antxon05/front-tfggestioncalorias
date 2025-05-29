type Props = {
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  autoComplete?: string;
  hasError?: boolean;
  dotted?: boolean;
  className?: string;
};

function Input({
  name,
  type,
  value,
  onChange,
  placeholder,
  label,
  autoComplete,
  hasError = false,
  dotted = false,
  className,
}: Props) {
  return (
    <div className="flex flex-col">
      {label && <label className="mb-1 font-semibold">{label}</label>}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={`flex-1 px-4 m-2 py-2 border ${
          hasError
            ? "border-red-500"
            : dotted
            ? "border-black"
            : "border-gray-300"
        } rounded-lg focus:outline-none focus:ring-2 ${
          hasError ? "focus:ring-red-400" : "focus:ring-green-400"
        } ${className ?? ""}`}
      />
    </div>
  );
}

export default Input;
