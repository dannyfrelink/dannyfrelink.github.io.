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
import { client } from "@/helpers/contentful";

export interface Destination {
  image: {
    fields: {
      title: string;
      file: {
        url: string;
      };
    };
  };
  name: string;
  description: string;
  priceLow: number;
  priceHigh: number;
  link: string;
}

export interface AccommodationsProps {
  accommodations: {
    [destination: string]: Destination[];
  };
  metaData: MetadataProps;
}

const Accommodations: React.FC<AccommodationsProps> = React.memo(
  ({ accommodations }) => {
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
                Zelf speuren wij altijd het internet af om op zoek te gaan naar
                de mooiste verblijven. Soms zoeken wij meer budget opties en af
                en toe verblijven we op een plek die wat duurder is. In
                Indonesië kan je echt van alles vinden: een guesthouse met lieve
                eigenaren, een luxe privé villa en alles wat hier tussenin zit.
                Een ding is zeker, al deze verblijven hebben onze ervaring een
                stukje mooier gemaakt. Wij hebben al op heel wat plekken
                verbleven en onze aanraders kan je op deze pagina vinden.
              </BaseText>
              <BaseText>
                Omdat Indonesië tegenwoordig heel populair is, is het verstandig
                van tevoren wat accommodaties vast te leggen. Dit kan vaak met
                gratis annulering, waardoor je altijd nog je plannen kan
                wijzigen.
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
  }
);

export const getStaticProps: GetStaticProps<AccommodationsProps> = async () => {
  const allMetaData: {
    [path: string]: MetadataProps;
  } = require("../data/metaData.json");

  const contentfulRes = await client.getEntries({
    content_type: "Accommodation",
  });
  const accommodations = contentfulRes.items
    .reverse()
    .reduce((group: any, accom: any) => {
      const location = accom.fields.location;
      group[location] = group[location] ?? [];
      group[location].push(accom.fields);
      return group;
    }, {});

  return {
    props: {
      accommodations,
      metaData: allMetaData["/accommodaties"],
    },
  };
};

export default Accommodations;
