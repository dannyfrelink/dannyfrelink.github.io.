import React from "react";
import { useAppContext } from "../../config/AppContext";

export interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  containerRef?: React.RefObject<HTMLDivElement>;
  style?: {
    top: number;
  };
}

const Container: React.FC<ContainerProps> = ({
  children,
  className,
  containerRef,
  style,
}) => {
  const { screenSize } = useAppContext();

  return (
    <section
      ref={containerRef}
      className={`bg-primary rounded-3xl ${className} ${
        screenSize < 750
          ? "px-[7.5vw] py-7"
          : screenSize < 1250
          ? "px-[9vw] py-12"
          : "px-[10vw] py-16"
      }`}
      style={style}
    >
      {children}
    </section>
  );
};

export default Container;
