import React, { type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export default function H3({ children, className = "" }: Props) {
  return (
    <h3 className={`text-xl text-green-700 font-semibold mb-5 ${className}`}>
      {children}
    </h3>
  );
}
