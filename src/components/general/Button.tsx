import React from "react";
import { useAppContext } from "../../config/AppContext";

export interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, className, onClick }) => {
  const { screenSize } = useAppContext();
  return (
    <button
      onClick={onClick}
      className={`${className} ${
        screenSize < 750
          ? "text-sm py-2 px-3 rounded-[12px_20px_8px_17px]"
          : screenSize < 1250
          ? "text-base py-2.5 px-3.5 rounded-[14px_23.33px_9.33px_19.83px]"
          : "text-lg py-2.5 px-4 rounded-[15px_25px_10px_21.25px]"
      } shadow-subtle text-primary font-bold bg-secondary`}
    >
      {children}
    </button>
  );
};

export default Button;
