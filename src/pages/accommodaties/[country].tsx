import {
  Header,
  Overview,
  Footer,
  AccommodationList,
  IntroOverview,
  ScrollBar,
} from "@/helpers/dynamicImports";
import React, { useEffect } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { ImageProps, MetadataProps } from "@/helpers/types";
import { useAppContext } from "@/config/AppContext";

export interface AccommodationProps {
  image: ImageProps;
  name: string;
  description: string;
  prices: {
    high: number;
    low: number;
  };
  link: string;
}

export interface AccommodationsData {
  [destination: string]: AccommodationProps[];
}

interface pageContentProps {
  image: ImageProps;
  title: string;
  subTitle: string;
  intro: {
    title: string;
    content: string;
  };
}

interface AccommodationsProps {
  data: {
    pageContent: pageContentProps;
    [destination: string]: AccommodationProps[] | pageContentProps;
  };
  metaData: MetadataProps;
}

const Accommodations: React.FC<AccommodationsProps> = React.memo(({ data }) => {
  const { setDestFilter, screenSize } = useAppContext();
  let accommodations: AccommodationsData = {};
  Object.keys(data).map((location) => {
    if (location != "pageContent") {
      const objectValue = { [location]: data[location] };
      Object.assign(accommodations, objectValue);
    }
  });
  const destinations = Object.keys(accommodations);
  const { pageContent } = data;
  const HeaderImage = require(`../../assets/header/blogs/${pageContent.image.src}`);

  useEffect(() => {
    setDestFilter("");
  }, []);

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
          title={pageContent.title}
        />

        <Overview destinations={destinations}>
          <IntroOverview title={pageContent.intro.title}>
            <div
              className={`[&_a]:underline [&_a]:font-[500] ${
                screenSize < 750 ? "[&>p+p]:mt-3" : "[&>p+p]:mt-5"
              }`}
              dangerouslySetInnerHTML={{
                __html: pageContent.intro.content,
              }}
            ></div>
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

export const getStaticProps: GetStaticProps<AccommodationsProps> = async ({
  params,
}) => {
  if (!params || !params.country) {
    return {
      notFound: true,
    };
  }

  const { country } = params;
  const accomData = require("../../data/accommodations.json");
  const data = accomData[country.toString()];

  const allMetaData: {
    [path: string]: {
      [path: string]: MetadataProps;
    };
  } = require("../../data/metaData.json");

  return {
    props: {
      data,
      metaData: allMetaData["/accommodaties"][`${country}`],
      country,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data = require("../../data/accommodations.json");

  const paths = Object.keys(data).map((country: string) => ({
    params: { country },
  }));

  return {
    paths,
    fallback: false,
  };
};

export default Accommodations;
