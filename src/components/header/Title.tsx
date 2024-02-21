import React from "react";
import { useAppContext } from "../../config/AppContext";
import H1 from "../typography/H1";

export interface TitleProps {
  title: string;
  subTitle?: string;
  align?: string;
  size?: string;
  isBlog: boolean;
}

const Title: React.FC<TitleProps> = ({
  title,
  subTitle,
  align,
  size,
  isBlog,
}) => {
  const { screenSize } = useAppContext();

  return (
    <section
      className={`${
        screenSize < 750
          ? `w-5/6 ${
              align === "center"
                ? "justify-center items-center text-center"
                : "justify-end pb-5"
            } ${size === "large" ? "h-[80vh]" : "h-[40vh]"}`
          : `h-[90vh] justify-center items-center text-center ${
              screenSize < 1250 ? "w-4/5" : "w-3/4"
            }`
      } flex flex-col mx-auto`}
    >
      <H1 subTitle={subTitle ? subTitle : ""} isBlog={isBlog}>
        {title}
      </H1>

      <p
        className={`${!subTitle && "hidden"} ${
          screenSize < 750
            ? `text-base mt-2 ${
                align === "center"
                  ? "font-semibold w-5/6 mx-auto"
                  : "text-primary"
              }`
            : `font-semibold mx-auto ${
                screenSize < 1250 ? "w-3/4 text-xl" : "w-3/5 text-2xl"
              }`
        }`}
      >
        {subTitle}
      </p>
    </section>
  );
};

export default Title;
