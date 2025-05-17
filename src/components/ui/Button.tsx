import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

function Button({ children }: Props) {
  return (
    <button
      type="button"
      className="bg-green-700 text-white font-semibold px-25 py-4 rounded-xl shadow-md transition-all duration-300 ease-out hover:bg-green-600 hover:scale-105"
    >
      {children}
    </button>
  );
}

export default Button;
