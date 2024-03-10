import React from "react";
import { useAppContext } from "../../../config/AppContext";
import H2 from "../../typography/H2";
import BaseText from "../../typography/BaseText";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { Destination } from "../../../pages/indonesie/index";
import ButtonLink from "../../general/ButtonLink";
import Image from "next/image";

export interface FeaturedProps {
  blog: Destination;
}

const Featured: React.FC<FeaturedProps> = ({ blog }) => {
  const { screenSize } = useAppContext();
  const imageSrc = require(`../../../assets/pages/blogposts/${blog.coverImage.src}`);
  const imageAlt = blog.coverImage.alt;

  return (
    <div className="flex items-center relative w-full h-[calc(85vh-(24px*2))]">
      <div className="absolute bottom-0 -left-0 w-full h-full opacity-60  bg-gradient-to-b from-transparent via-gray-700 to-transparent z-[-1]"></div>
      <Image
        width={1500}
        height={1000}
        className="w-full h-[85vh] absolute -top-6 z-[-2] object-cover object-[50%_65%]"
        src={imageSrc}
        alt={imageAlt}
      />

      <div
        className={`w-full ${
          screenSize > 750 && screenSize < 1250
            ? "pl-[9vw]"
            : screenSize < 1750 && "pl-[10vw]"
        }`}
      >
        <section
          className={`text-primary w-[85vw]  ${
            screenSize < 750
              ? "[&>*:not(:last-child)]:mb-4 mx-auto"
              : screenSize < 1250
              ? "[&>*:not(:last-child)]:mb-5"
              : `[&>*:not(:last-child)]:mb-6 ${
                  screenSize > 1750 && "max-w-[1400px] mx-auto"
                }`
          }`}
        >
          <div className="max-w-[650px]">
            <p
              className={`italic ${
                screenSize < 750 ? "text-sm mb-2" : "text-base mb-2.5"
              }`}
            >
              Uitgelicht
            </p>
            <H2>{blog.title}</H2>
          </div>
          <BaseText className="max-w-[650px]">{blog.featured}</BaseText>

          <ButtonLink link={`/indonesie/${blog.href}`}>
            Ontdek ervaring{" "}
            <ArrowForwardRoundedIcon
              fontSize={screenSize < 750 ? "small" : "medium"}
            />
          </ButtonLink>
        </section>
      </div>
    </div>
  );
};

export default Featured;
