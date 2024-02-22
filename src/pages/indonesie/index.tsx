import HeaderImage from "../../assets/header/blogs.jpg";
import { useAppContext } from "../../config/AppContext";
import {
  Header,
  Overview,
  BaseText,
  ListOverview,
  H3,
  Footer,
  H2,
  CountryTag,
  ScrollBar,
} from "@/helpers/dynamicImports";
import Link from "next/link";
import ThermostatRoundedIcon from "@mui/icons-material/ThermostatRounded";
import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded";
import AccessTimeFilledRoundedIcon from "@mui/icons-material/AccessTimeFilledRounded";
import FlightRoundedIcon from "@mui/icons-material/FlightRounded";
import React, { useEffect, useState } from "react";
import { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { MetadataProps } from "..";

export interface Destination {
  id: number;
  metaTitle: string;
  metaDesc: string;
  date: string;
  href: string;
  coverImage: {
    src: string;
    alt: string;
  };
  title: string;
  headers: string[];
  content: {
    [section: string]:
      | {
          text: string;
          image?: {
            src: string;
            alt: string;
          };
        }
      | undefined;
  };
  images: {
    src: {
      [image: string]: string | undefined;
    };
    alt: {
      [image: string]: string | undefined;
    };
  };
  featured?: string;
  carousel?: boolean;
}

export interface BlogsData {
  [destination: string]: Destination[];
}

interface BlogsProps {
  data: {
    blogs: BlogsData;
  };
  metaData: MetadataProps;
}

const BlogOverview: React.FC<BlogsProps> = React.memo(({ data }) => {
  const { screenSize } = useAppContext();
  const blogs: BlogsData = data.blogs;
  const destinations = Object.keys(blogs);
  const [headerImage, setHeaderImage] = useState<string>();
  useEffect(() => {
    headerImage !== "" && setHeaderImage("../../assets/header/blogs.jpg");
  }, [headerImage, setHeaderImage]);

  const tags = [
    {
      icon: <ThermostatRoundedIcon />,
      title: "Beste reistijd",
      value: "April - Oktober",
    },
    {
      icon: <AttachMoneyRoundedIcon />,
      title: "Valuta",
      value: "Indonesische Rupiah",
    },
    {
      icon: <AccessTimeFilledRoundedIcon />,
      title: "Tijdsverschil",
      value: "6/7 uur",
    },
    {
      icon: <FlightRoundedIcon />,
      title: "Vliegtijd",
      value: "16 uur",
    },
  ];

  return (
    <ScrollBar>
      <div>
        {/* <Head>
          <title>Reizen naar Indonesië</title>
          <meta
            name="description"
            content="Indonesië is een prachtige reisbestemming. Je kunt hier alles vinden, zoals prachtige stranden, groene jungles en een interessante cultuur."
          />

          <meta property="og:title" content="Reizen naar Indonesië" />
          <meta
            property="og:description"
            content="Indonesië is een prachtige reisbestemming. Je kunt hier alles vinden, zoals prachtige stranden, groene jungles en een interessante cultuur."
          />
          <meta
            property="og:url"
            content="https://www.reisfeeld.nl/indonesie/"
          />

          <meta
            name="og:image"
            content={`https://www.reisfeeld.nl${HeaderImage.src}`}
          />
          <meta property="og:image:width" content="2500" />
          <meta property="og:image:height" content="1667" />
          <meta property="og:image:type" content="image/jpeg" />
        </Head> */}

        <Header
          HeaderImage={() => (
            <Image
              width={2000}
              height={1300}
              src={HeaderImage}
              alt="Rijstvelden Indonesië"
            />
          )}
          title="Indonesië"
          subTitle={
            "Waar gastvrijheid, cultuur, lekker eten en prachtige natuur allemaal samen komen."
          }
        />

        <Overview destinations={destinations}>
          <section className="max-w-[1000px] mx-auto">
            <div
              className={`${
                screenSize < 1000
                  ? "grid grid-cols-2 gap-x-2 gap-y-6 text-center max-w-[650px] mx-auto mb-7"
                  : `flex ${screenSize < 1250 ? "mb-10" : "mb-14"}`
              }`}
            >
              {tags.map((tag, index) => {
                return (
                  <CountryTag
                    key={index}
                    title={tag.title}
                    value={tag.value}
                    icon={tag.icon}
                  />
                );
              })}
            </div>

            <H2
              className={`text-center ${screenSize < 1250 ? "mb-4" : "mb-6"}`}
            >
              Reizen naar Indonesië
            </H2>
            <article
              className={`text-center ${
                screenSize < 1250
                  ? "[&>*:not(:last-child)]:mb-3"
                  : "[&>*:not(:last-child)]:mb-4"
              }`}
            >
              <BaseText>
                Indonesië is echt onze favoriete reisbestemming! Je kunt hier
                alles vinden, van prachtige stranden tot groene jungles en van
                helderblauw water tot een interessante cultuur. Ook kan je
                ervoor kiezen om goedkoop te reizen, een mooie middenweg te
                nemen of uit te pakken met mega luxe verblijven. De bevolking is
                ontzettend gastvrij en behulpzaam en voor de Indische keuken kan
                je ons echt wakker maken. In de natuur kan je hier van alles
                vinden, denk aan watervallen, vulkanen, mooie uitzichtpunten en
                niet te vergeten: rijstvelden!
              </BaseText>
            </article>
          </section>

          <section className="[&>div:first-child>div]:!mt-0 [&>div:first-child>div]:!pt-0">
            {destinations.map((dest, index) => {
              const blogsPerDest = blogs[dest];

              return (
                <ListOverview title="Blogs over" dest={dest} key={index}>
                  {blogsPerDest.map((blog, index) => {
                    const image = require(`../../assets/pages/blogposts/${blog.coverImage.src}`);

                    return (
                      <Link
                        href={`/indonesie/${blog.href}`}
                        className={`relative ${
                          screenSize < 900
                            ? "w-full max-w-[550px] h-[56vw] max-h-[325px] [&>*:not(:nth-child[1])]:mt-2 mt-5"
                            : `w-[36vw] max-w-[650px] h-[24vw] max-h-[375px] mx-auto ${
                                screenSize < 1250
                                  ? "[&>*:not(:nth-child[1])]:mt-2.5"
                                  : "[&>*:not(:nth-child[1])]:mt-3"
                              }`
                        }`}
                        key={index}
                      >
                        <div className="absolute bottom-0 w-full rounded-2xl h-full opacity-60 bg-gradient-to-t from-gray-700 via-transparent via-80% to-gray-400"></div>

                        <Image
                          width={500}
                          height={500}
                          src={image}
                          alt={blog.coverImage.alt}
                          className="w-screen h-full object-cover object-center rounded-2xl shadow-subtle"
                        />

                        <H3 className="absolute w-[90%] left-[5%] text-primary bottom-4">
                          {blog.title}
                        </H3>
                      </Link>
                    );
                  })}
                </ListOverview>
              );
            })}
          </section>
        </Overview>

        <Footer />
      </div>
    </ScrollBar>
  );
});

export const getStaticProps: GetStaticProps<BlogsProps> = async () => {
  const data = require("../../data/blogs.json");
  const allMetaData: {
    [path: string]: MetadataProps;
  } = require("../../data/metaData.json");

  return {
    props: {
      data,
      metaData: allMetaData["/accommodaties"],
    },
  };
};

export default BlogOverview;
