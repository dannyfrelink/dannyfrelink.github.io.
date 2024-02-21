import React from "react";
import BaseText from "../../typography/BaseText";
import { useAppContext } from "../../../config/AppContext";

export interface CountryTagProps {
  title: string;
  value: string;
  icon: JSX.Element;
}

const CountryTag: React.FC<CountryTagProps> = ({ title, value, icon }) => {
  const { screenSize } = useAppContext();
  return (
    <section
      className={`flex  items-center mx-auto ${
        screenSize < 1000 && "flex-col"
      }`}
    >
      <div
        className={`flex justify-center items-center bg-tertair text-primary rounded-full ${
          screenSize < 750
            ? "h-10 w-10 [&>svg]:text-lg mb-1.5"
            : screenSize < 1000
            ? "h-[44px] w-[44px] [&>svg]:text-xl mb-1.5"
            : "h-12 w-12 mr-2.5"
        }`}
      >
        {icon}
      </div>

      <article>
        <BaseText className="font-semibold">{title}</BaseText>
        <BaseText>{value}</BaseText>
      </article>
    </section>
  );
};

export default CountryTag;
