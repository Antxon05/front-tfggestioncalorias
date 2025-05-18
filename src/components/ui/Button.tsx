import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

function Button({ children }: Props) {
  return (
    <button
      type="button"
      className="cursor-pointer bg-green-700 text-white font-semibold px-26 py-4 rounded-xl shadow-md transition-all duration-300 ease-out hover:bg-green-600 hover:scale-105"
    >
      {children}
    </button>
  );
}

export default Button;
