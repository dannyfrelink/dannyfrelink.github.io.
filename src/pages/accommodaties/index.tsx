import {
  Header,
  BaseText,
  H3,
  Footer,
  H2,
  ScrollBar,
  Container,
} from "@/helpers/dynamicImports";
import Link from "next/link";
import React from "react";
import { GetStaticProps } from "next";
import Image from "next/image";
import { ImageProps, MetadataProps } from "@/helpers/types";
import { useAppContext } from "@/config/AppContext";
import HeaderImage from "../../assets/header/accommodations/cover.webp";

interface CountryProps {
  [country: string]: {
    [countryName: string]: ImageProps;
  };
}

export interface AccommodationsProps {
  countries: CountryProps[];
  metaData: MetadataProps;
}

const Accommodations: React.FC<AccommodationsProps> = React.memo(
  ({ countries }) => {
    const { screenSize } = useAppContext();

    return (
      <ScrollBar>
        <Header
          size="small"
          align="bottom"
          imageHeight="small"
          HeaderImage={() => (
            <Image
              width={2000}
              height={1300}
              src={HeaderImage}
              alt="Accommodatiepagina"
            />
          )}
          title="Accommodaties"
        />

        <Container className="text-center">
          <div className="max-w-[1000px] mx-auto">
            <H2 className={`${screenSize < 1250 ? "mb-4" : "mb-6"}`}>
              Onze favoriete accommodaties
            </H2>
            <BaseText className={`${screenSize < 750 ? "mb-3" : "mb-5"}`}>
              Zelf speuren wij altijd het internet af om op zoek te gaan naar de
              mooiste accommodaties om in te verblijven. Soms zoeken wij meer
              budget opties en af en toe verblijven we op een plek die wat
              duurder is. Eén ding is zeker, al deze verblijven hebben onze
              ervaring een stukje mooier gemaakt. Wat voor ons sowieso
              belangrijk is, is een schone accommodatie die op een fijne locatie
              ligt.
            </BaseText>
            <BaseText>
              Of je nu opzoek bent naar budgetvriendelijke accommodaties of
              juist naar iets unieks: dit zijn onze favoriete plekken om te
              verblijven!
            </BaseText>
          </div>

          <div
            className={`grid max-w-[1500px] mx-auto ${
              screenSize < 900
                ? "justify-center flex-col [&>*:not(:last-child)]:mb-5 gap-y-2 mt-6"
                : `grid-cols-2 ${
                    screenSize < 1250 ? "gap-y-14 mt-10" : "gap-y-16 mt-12"
                  }`
            }`}
          >
            {countries.map((country) => {
              const countryUrl = Object.keys(country)[0];
              const countryName = Object.keys(Object.values(country)[0])[0];
              const countryImage = Object.values(Object.values(country)[0])[0];
              const countryImageSrc = require(`../../assets/header/accommodations/${countryImage.src}`);

              return (
                <Link
                  key={countryUrl}
                  href={`/accommodaties/${countryUrl}`}
                  className={`relative ${
                    screenSize < 900
                      ? "w-full max-w-[550px] h-[56vw] max-h-[325px] [&>*:not(:nth-child[1])]:mt-2 mt-5"
                      : `w-[36vw] max-w-[650px] h-[24vw] max-h-[375px] mx-auto ${
                          screenSize < 1250
                            ? "[&>*:not(:nth-child[1])]:mt-2.5"
                            : "[&>*:not(:nth-child[1])]:mt-3"
                        }`
                  }`}
                >
                  <div className="absolute bottom-0 w-full rounded-2xl h-full opacity-60 bg-gradient-to-t from-gray-700 via-transparent via-80% to-gray-400"></div>
                  <Image
                    width={500}
                    height={500}
                    className="rounded-2xl w-full h-full max-h-[400px] object-cover object-center"
                    src={countryImageSrc}
                    alt={countryImage.alt}
                  />
                  <H3
                    className={`absolute z-10 font-semibold text-primary ${
                      screenSize < 750
                        ? "bottom-4 inset-x-4"
                        : screenSize < 1000
                        ? "bottom-4 inset-x-4"
                        : screenSize < 1250
                        ? "bottom-3 inset-x-3"
                        : "bottom-5 inset-x-4"
                    }`}
                  >
                    {countryName}
                  </H3>
                </Link>
              );
            })}
          </div>
        </Container>

        <Footer />
      </ScrollBar>
    );
  }
);

export const getStaticProps: GetStaticProps<AccommodationsProps> = () => {
  const accomData = require("../../data/accommodations.json");
  const countries: CountryProps[] = [];
  Object.keys(accomData).map((country) =>
    countries.push({
      [country]: {
        [accomData[country].pageContent.country]:
          accomData[country].pageContent.image,
      },
    })
  );

  const allMetaData: {
    [path: string]: MetadataProps;
  } = require("../../data/metaData.json");

  return {
    props: {
      countries,
      metaData: allMetaData["/accommodaties"],
    },
  };
};

export default Accommodations;
