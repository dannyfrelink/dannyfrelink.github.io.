import React from "react";
import { useAppContext } from "../../config/AppContext";

export interface H2Props {
  children: React.ReactNode;
  id?: string;
  className?: string;
}

const H2: React.FC<H2Props> = ({ children, id, className }) => {
  const { screenSize } = useAppContext();
  return (
    <h2
      id={id}
      className={`font-semibold ${className} ${
        screenSize < 750
          ? "text-xl"
          : screenSize < 1250
          ? "text-2xl"
          : "text-3xl"
      }`}
    >
      {children}
    </h2>
  );
};

export default H2;
