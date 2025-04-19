import { useAppContext } from "../../../config/AppContext";
import {
  Header,
  Overview,
  BaseText,
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
import React, { useEffect } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { BlogDataProps, BlogProps, MetadataProps } from "@/helpers/types";

interface BlogsProps {
  data: BlogDataProps["country"];
  metaData: MetadataProps;
  country: string | string[];
}

const BlogOverview: React.FC<BlogsProps> = React.memo(({ data, country }) => {
  const { screenSize, destFilter, setDestFilter } = useAppContext();
  const blogs: BlogsProps["data"]["blogs"] = data.blogs;
  const allBlogs: BlogProps[] = [];

  if (destFilter == "") {
    Object.values(blogs).map((blog) => blog.map((b) => allBlogs.push(b)));
  } else {
    Object.keys(blogs).map(
      (location) =>
        location == destFilter && blogs[location].map((b) => allBlogs.push(b))
    );
  }

  const destinations = Object.keys(blogs);
  const pageContent = data.pageContent;
  const HeaderImage = require(`../../../assets/header/blogs/${pageContent.image.src}`);

  useEffect(() => {
    setDestFilter("");
  }, []);

  const tags = [
    {
      icon: <ThermostatRoundedIcon />,
      title: "Beste reistijd",
      value: pageContent.intro.bestSeason,
    },
    {
      icon: <AttachMoneyRoundedIcon />,
      title: "Valuta",
      value: pageContent.intro.currency,
    },
    {
      icon: <AccessTimeFilledRoundedIcon />,
      title: "Tijdsverschil",
      value: pageContent.intro.timeDifference,
    },
    {
      icon: <FlightRoundedIcon />,
      title: "Vliegtijd",
      value: pageContent.intro.travelTime,
    },
  ];

  return (
    <ScrollBar>
      <div>
        <Header
          HeaderImage={() => (
            <Image
              width={2000}
              height={1300}
              src={HeaderImage}
              alt={pageContent.image.alt}
            />
          )}
          title={pageContent.title}
          subTitle={pageContent.subTitle}
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
              {pageContent.intro.title}
            </H2>
            <article
              className={`text-center ${
                screenSize < 1250
                  ? "[&>*:not(:last-child)]:mb-3"
                  : "[&>*:not(:last-child)]:mb-4"
              }`}
            >
              <div
                className={`[&_a]:underline [&_a]:font-[500] ${
                  screenSize < 750 ? "[&>p+p]:mt-3" : "[&>p+p]:mt-5"
                }`}
                dangerouslySetInnerHTML={{
                  __html: pageContent.intro.content,
                }}
              ></div>
            </article>
          </section>

          <section
            className={`grid max-w-[1500px] mx-auto ${
              screenSize < 900
                ? "justify-center flex-col [&>*:not(:last-child)]:mb-5 gap-y-2"
                : `grid-cols-2 ${screenSize < 1250 ? "gap-y-14" : "gap-y-16"}`
            }`}
          >
            {allBlogs.map((blog, index) => {
              const imageSrc = require(`../../../assets/pages/blogposts/${blog.coverImage.src}`);
              const imageAlt = blog.coverImage.alt;

              return (
                <Link
                  key={index}
                  href={`/bestemmingen/${country}/${blog.href}`}
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
                    src={imageSrc}
                    alt={imageAlt}
                    className="w-screen h-full object-cover object-center rounded-2xl shadow-subtle"
                  />

                  <H3 className="absolute w-[90%] left-[5%] text-primary bottom-4">
                    {blog.title}
                  </H3>
                </Link>
              );
            })}
          </section>
        </Overview>

        <Footer />
      </div>
    </ScrollBar>
  );
});

export const getStaticProps: GetStaticProps<BlogsProps> = async ({
  params,
}) => {
  if (!params || !params.country) {
    return {
      notFound: true,
    };
  }

  const { country } = params;
  const blogData = require("../../../data/blogs.json");
  const data = blogData[country.toString()];
  const allMetaData: {
    [path: string]: {
      [path: string]: MetadataProps;
    };
  } = require("../../../data/metaData.json");

  return {
    props: {
      data,
      metaData: allMetaData["/bestemmingen"][country.toString()],
      country,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data: BlogDataProps = require("../../../data/blogs.json");

  const paths = Object.keys(data).map((country: string) => ({
    params: { country },
  }));

  return {
    paths,
    fallback: false,
  };
};

export default BlogOverview;
