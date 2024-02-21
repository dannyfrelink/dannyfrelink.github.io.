import React from "react";
import H3 from "../../typography/H3";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { AccommodationsData } from "../../../pages/accommodaties";
import BaseText from "../../typography/BaseText";
import { useAppContext } from "../../../config/AppContext";
import ListOverview from "./ListOverview";
import ButtonLink from "../../general/ButtonLink";
import Image from "next/image";

export interface AccommodationListProps {
  accommodations: AccommodationsData;
  destinations: string[];
}

const AccommodationList: React.FC<AccommodationListProps> = ({
  accommodations,
  destinations,
}) => {
  const { screenSize } = useAppContext();

  return (
    <div className="[&>div:first-child>div]:!mt-0 [&>div:first-child>div]:!pt-0">
      {destinations.map((dest, index) => {
        const accoms = accommodations[dest];

        return (
          <ListOverview
            title="Leukste accommodaties in"
            dest={dest}
            key={index}
          >
            {accoms.map((accom: any, index: number) => {
              const image = require(`../../../assets/pages/accommodations/${accom.image.src}`);

              return (
                <section
                  className={`flex flex-col items-center h-full ${
                    screenSize < 900 && "pt-5 max-w-[550px]"
                  }`}
                  key={index}
                >
                  <Image
                    width={500}
                    height={500}
                    src={image}
                    alt={accom.image.alt}
                    className={`mb-4 object-cover object-center rounded-2xl shadow-subtle ${
                      screenSize < 900
                        ? "w-full max-w-[550px] h-[56vw] max-h-[325px]"
                        : "w-[36vw] max-w-[650px] h-[24vw] max-h-[375px]"
                    }`}
                  />

                  <div
                    className={`flex-1 grid ${
                      screenSize < 900
                        ? "[&>*:not(:last-child)]:mb-2 max-w-[550px] [&>a]:mt-3"
                        : `w-[88%] max-w-[650px] [&>a]:self-end ${
                            screenSize < 1250
                              ? "[&>*:not(:last-child)]:mb-2.5 [&>a]:mt-4"
                              : "[&>*:not(:last-child)]:mb-3 [&>a]:!mt-5"
                          }`
                    }`}
                  >
                    <H3
                      className={
                        screenSize < 750
                          ? "mt-1.5"
                          : screenSize < 1250
                          ? "mt-3"
                          : "mt-[18px]"
                      }
                    >
                      {accom.name}
                    </H3>
                    <BaseText>{accom.description}</BaseText>

                    <article>
                      <BaseText className="font-medium">Laagseizoen</BaseText>
                      <BaseText>Prijzen vanaf €{accom.prices.low}</BaseText>
                    </article>

                    <article>
                      <BaseText className="font-medium">Hoogseizoen</BaseText>
                      <BaseText>Prijzen vanaf €{accom.prices.high}</BaseText>
                    </article>

                    <ButtonLink link={accom.link} blank>
                      Bekijk accommodatie{" "}
                      <ArrowForwardRoundedIcon
                        fontSize={screenSize < 750 ? "small" : "medium"}
                      />
                    </ButtonLink>
                  </div>
                </section>
              );
            })}
          </ListOverview>
        );
      })}
    </div>
  );
};

export default AccommodationList;
