import React, { type ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function H3({ children }: Props) {
  return (
    <h3 className="text-xl text-green-700 font-semibold mb-5">{children}</h3>
  );
}
