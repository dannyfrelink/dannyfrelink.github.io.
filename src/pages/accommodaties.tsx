import {
  Header,
  BaseText,
  Overview,
  Footer,
  AccommodationList,
  IntroOverview,
  ScrollBar,
} from "@/helpers/dynamicImports";
import HeaderImage from "../assets/header/accommodations.jpg";
import React from "react";
import { GetStaticProps } from "next";
import Image from "next/image";
import { MetadataProps } from ".";

export interface Destination {
  image: {
    src: string;
    alt: string;
  };
  name: string;
  description: string;
  prices: {
    high: number;
    low: number;
  };
  link: string;
}

export interface AccommodationsData {
  [destination: string]: Destination[];
}

interface AccommodationsProps {
  data: {
    accommodations: AccommodationsData;
  };
  metaData: MetadataProps;
}

const Accommodations: React.FC<AccommodationsProps> = React.memo(({ data }) => {
  const accommodations: AccommodationsData = data.accommodations;
  const destinations = Object.keys(accommodations);

  return (
    <ScrollBar>
      <div>
        <Header
          size="small"
          align="bottom"
          HeaderImage={() => (
            <Image
              width={2000}
              height={1300}
              src={HeaderImage}
              alt="Hotels op Bali"
            />
          )}
          imageHeight="small"
          title="Accommodaties"
        />

        <Overview destinations={destinations}>
          <IntroOverview title="Accommodatie tips in Indonesië!">
            <BaseText>
              Zelf speuren wij altijd het internet af om op zoek te gaan naar de
              mooiste verblijven. Soms zoeken wij meer budget opties en af en
              toe verblijven we op een plek die wat duurder is. In Indonesië kan
              je echt van alles vinden: een guesthouse met lieve eigenaren, een
              luxe privé villa en alles wat hier tussenin zit. Een ding is
              zeker, al deze verblijven hebben onze ervaring een stukje mooier
              gemaakt. Wij hebben al op heel wat plekken verbleven en onze
              aanraders kan je op deze pagina vinden.
            </BaseText>
            <BaseText>
              Omdat Indonesië tegenwoordig heel populair is, is het verstandig
              van tevoren wat accommodaties vast te leggen. Dit kan vaak met
              gratis annulering, waardoor je altijd nog je plannen kan wijzigen.
            </BaseText>
          </IntroOverview>

          <AccommodationList
            accommodations={accommodations}
            destinations={destinations}
          />
        </Overview>

        <Footer />
      </div>
    </ScrollBar>
  );
});

export const getStaticProps: GetStaticProps<AccommodationsProps> = async () => {
  const data = require("../data/accommodations.json");
  const allMetaData: {
    [path: string]: MetadataProps;
  } = require("../data/metaData.json");

  return {
    props: {
      data,
      metaData: allMetaData["/accommodaties"],
    },
  };
};

export default Accommodations;
