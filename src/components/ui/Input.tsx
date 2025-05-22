type Props = {
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  autoComplete?: string;
  hasError?: boolean;
};

function Input({
  name,
  type,
  value,
  onChange,
  placeholder,
  autoComplete,
  hasError = false,
}: Props) {
  return (
    <>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={`flex-1 px-4 m-2 py-2 border ${
          hasError ? "border-red-500" : "border-gray-300"
        } rounded-lg focus:outline-none focus:ring-2 ${
          hasError ? "focus:ring-red-400" : "focus:ring-green-400"
        }`}
      />
    </>
  );
}

export default Input;
