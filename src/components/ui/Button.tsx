import type { ButtonHTMLAttributes, ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  small?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

function Button({ children, className = "", small = false, ...props }: Props) {
  const baseStyle = small
    ? "cursor-pointer bg-green-700 text-white font-semibold px-4 py-3 rounded-xl shadow-md transition-all duration-300 ease-out hover:bg-green-600 hover:scale-105 m-3"
    : "cursor-pointer bg-green-700 text-white font-semibold px-25 py-4 rounded-xl shadow-md transition-all duration-300 ease-out hover:bg-green-600 hover:scale-105 m-3";

  return (
    <button type="button" className={`${baseStyle} ${className}`} {...props}>
      {children}
    </button>
  );
}

export default Button;
