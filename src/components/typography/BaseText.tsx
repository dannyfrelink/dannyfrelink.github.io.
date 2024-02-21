import React from "react";
import { useAppContext } from "../../config/AppContext";

export interface BaseTextProps {
  children: React.ReactNode;
  className?: string;
}

const BaseText: React.FC<BaseTextProps> = ({ children, className }) => {
  const { screenSize } = useAppContext();

  return (
    <div
      className={`${className} ${screenSize < 750 ? "text-base" : "text-lg"}`}
    >
      {children}
    </div>
  );
};

export default BaseText;
