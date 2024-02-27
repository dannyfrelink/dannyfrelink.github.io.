import React from "react";
import { useAppContext } from "../../config/AppContext";

export interface H4Props {
  children: React.ReactNode;
  color?: "black" | "white";
  className?: string;
}

const H4: React.FC<H4Props> = ({ children, color = "black", className }) => {
  const { screenSize } = useAppContext();
  return (
    <h4
      className={`font-medium ${className} ${
        color === "black" ? "text-black" : "text-primary"
      } ${
        screenSize < 750
          ? "text-base"
          : screenSize < 1250
          ? "text-lg"
          : "text-xl"
      }`}
    >
      {children}
    </h4>
  );
};

export default H4;
