import React from "react";
import { useAppContext } from "../../config/AppContext";

export interface H3Props {
  children: React.ReactNode;
  color?: "black" | "white";
  className?: string;
}

const H3: React.FC<H3Props> = ({ children, color = "black", className }) => {
  const { screenSize } = useAppContext();
  return (
    <div
      className={`font-semibold ${className} ${
        color === "black" ? "text-black" : "text-primary"
      } ${
        screenSize < 750
          ? "text-lg"
          : screenSize < 1250
          ? "text-xl"
          : "text-2xl"
      }`}
    >
      {children}
    </div>
  );
};

export default H3;
