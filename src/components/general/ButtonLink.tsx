import React from "react";
import Link from "next/link";
import { useAppContext } from "../../config/AppContext";

export interface ButtonLinkProps {
  children: React.ReactNode;
  link: string;
  blank?: boolean;
  className?: string;
}

const ButtonLink: React.FC<ButtonLinkProps> = ({
  children,
  link,
  blank = false,
  className,
}) => {
  const { screenSize } = useAppContext();
  return (
    <Link
      className="block w-fit"
      href={link}
      target={blank ? "blank" : undefined}
    >
      <div
        className={`buttonLink ${className} ${
          screenSize < 750
            ? "text-sm py-2 px-3 rounded-[12px_20px_8px_17px]"
            : screenSize < 1250
            ? "text-base py-2.5 px-3.5 rounded-[14px_23.33px_9.33px_19.83px]"
            : "text-lg py-2.5 px-4 rounded-[15px_25px_10px_21.25px]"
        } shadow-subtle text-primary w-fit font-bold bg-secondary`}
      >
        {children}
      </div>
    </Link>
  );
};

export default ButtonLink;
