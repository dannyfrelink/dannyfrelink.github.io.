import {
  Header,
  H2,
  Carousel,
  Container,
  Featured,
  BaseText,
  Footer,
  ButtonLink,
  ScrollBar,
} from "@/helpers/dynamicImports";
import { useAppContext } from "../config/AppContext";
import HeaderImage from "../assets/header/home.webp";
import AboutImage from "../assets/pages/about/couple.jpg";
import React from "react";
import Image from "next/image";
import { GetStaticProps } from "next";
import {
  BlogCountryProps,
  BlogDataProps,
  MetadataProps,
} from "@/helpers/types";

interface HomeProps {
  blogData: BlogDataProps;
  metaData: MetadataProps;
}

const Home: React.FC<HomeProps> = React.memo(({ blogData }) => {
  const { screenSize } = useAppContext();
  const blogs: BlogCountryProps[] = [];
  Object.keys(blogData).map((country) =>
    Object.values(blogData[country].blogs).map((blog) =>
      blog.map((b) => blogs.push({ country, blog: b }))
    )
  );

  const carouselBlogs = blogs.filter((blog) => blog.blog.carousel);
  const featuredBlog = blogs.filter((blog) => blog.blog.featured)[0];

  return (
    <ScrollBar>
      <div>
        <Header
          HeaderImage={() => (
            <Image
              width={2000}
              height={1300}
              src={HeaderImage}
              alt="Bromo Vulkaan"
            />
          )}
          title="Jouw Avontuur Ons Verhaal"
          subTitle="Beleef de reis van jouw dromen met al onze tips en tricks"
        />

        <main className="rounded-3xl">
          <Container className={screenSize > 750 ? "!px-0" : ""}>
            <div className="max-w-[1800px] mx-auto">
              <H2
                className={`text-center ${screenSize < 750 ? "mb-5" : "mb-7"}`}
              >
                De nieuwste blogs
              </H2>
              <Carousel items={carouselBlogs} />
            </div>
          </Container>

          <Featured blog={featuredBlog} />

          <Container>
            <section
              className={`[&>*:not(:last-child)]:mb-5 ${
                screenSize < 850 && "max-w-[500px] mx-auto"
              } ${
                screenSize > 1350 &&
                "flex justify-between flex-row-reverse max-w-[1400px] mx-auto"
              }`}
            >
              <H2 className={`text-center ${screenSize >= 850 && "hidden"}`}>
                Hi, wij zijn Danny & Lisa!
              </H2>

              <Image
                width={500}
                height={500}
                className={`h-[85vw] w-[85vw] object-cover object-[50%_75%] rounded-2xl shadow-subtle ${
                  screenSize < 850
                    ? "max-h-[300px] mx-auto"
                    : `max-w-[475px] float-right !mb-0 ml-10 ${
                        screenSize < 1250 ? "max-h-[280px]" : "max-h-[320px]"
                      }`
                }`}
                src={AboutImage}
                alt="Us"
              />

              <article
                className={`[&>*:not(:last-child)]:mb-5 max-w-[600px] ${
                  screenSize < 850 && "flex flex-col items-center text-center"
                }`}
              >
                <H2 className={screenSize >= 850 ? "block" : "hidden"}>
                  Hi, wij zijn Danny & Lisa!
                </H2>
                <BaseText>
                  In 2018 zijn wij voor het eerst voor acht maanden samen op
                  reis geweest en hebben wij ontdekt dat dit is wat wij het
                  liefste doen. Vele reizen verder hebben wij besloten al onze
                  reizen, tips, accommodaties en veel meer te gaan delen op
                  Reisfeeld.nl. Met onze tips en ervaringen hopen wij jouw
                  voorbereidingen én reis een stukje leuker te maken! We zijn
                  nog lang niet klaar met reizen, dus houd ook onze socials in
                  de gaten voor leuke reiscontent!
                </BaseText>

                <ButtonLink link="/over-ons">Leer ons beter kennen</ButtonLink>
              </article>
            </section>
          </Container>
        </main>

        <Footer />
      </div>
    </ScrollBar>
  );
});

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const blogData = require("../data/blogs.json");

  const allMetaData: {
    [path: string]: MetadataProps;
  } = require("../data/metaData.json");

  return {
    props: {
      blogData,
      metaData: allMetaData["/"],
    },
  };
};

export default Home;
