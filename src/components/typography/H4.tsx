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
    <div
      className={`font-semibold ${className} ${
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
    </div>
  );
};

export default H4;
