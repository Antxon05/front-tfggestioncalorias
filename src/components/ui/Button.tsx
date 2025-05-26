import type { ButtonHTMLAttributes, ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

function Button({ children, className = "", ...props }: Props) {
  const baseStyle =
    "cursor-pointer bg-green-700 text-white font-semibold px-25 py-4 rounded-xl shadow-md transition-all duration-300 ease-out hover:bg-green-600 hover:scale-105 m-3";

  return (
    <button type="button" className={`${baseStyle} ${className}`} {...props}>
      {children}
    </button>
  );
}

export default Button;
