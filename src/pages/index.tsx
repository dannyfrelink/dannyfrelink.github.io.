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
import { Destination } from "./indonesie/index";
import { useEffect, useState } from "react";
import React from "react";
// import { GetStaticProps } from "next";
// import Head from "next/head";
// import dynamic from "next/dynamic";
// const Head = dynamic(() => import("next/head"));
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { GetStaticProps } from "next";
// import { NextSeo } from "next-seo";
// const DynamicNextSeo = dynamic(() =>
//   import("next-seo").then((mod) => mod.NextSeo)
// );
// import { useRouter } from "next/router";
// import Head from "next/head";

export interface MetadataProps {
  title: string;
  description: string;
  url: string;
  image: string;
  fbAppID: string;
}

interface HomeProps {
  blogData: {
    blogs: {
      [dest: string]: Destination[];
    };
  };
  metaData: MetadataProps;
}

const Home: React.FC<HomeProps> = React.memo(({ blogData }) => {
  const { screenSize } = useAppContext();
  const blogs: Destination[] = [];
  Object.values(blogData.blogs).map((blogArr) =>
    blogArr.map((blog) => blogs.push(blog))
  );
  const carouselBlogs = blogs.filter((blog) => blog.carousel);
  const featuredBlog = blogs.filter((blog) => blog.featured)[0];
  const [headerImage, setHeaderImage] = useState<string | StaticImport>("");

  useEffect(() => {
    headerImage !== "" && setHeaderImage(HeaderImage);
  }, [headerImage]);

  return (
    <ScrollBar>
      {/* <DynamicNextSeo
        title={metaData.title}
        description={metaData.description}
        openGraph={{
          title: "Testing Reisfeeld",
          description: "Testing description Reisfeeld",
          url: "https://www.reisfeeld.nl/",
          images: [
            {
              url: `${HeaderImage.src}`,
              alt: "Bromo Vulkaan",
            },
          ],
        }}
      /> */}

      {/* <Head>
        <title>ReisFeeld.nl | Jouw avontuur, ons verhaal!</title>
        <meta
          name="description"
          content="Beleef de reis van jouw dromen met al onze tips en tricks. Ontdek de leukste activiteiten, mooiste plekjes en beste restaurants!"
        />

        <meta
          property="og:title"
          content="ReisFeeld.nl | Jouw avontuur, ons verhaal!"
        />
        <meta
          property="og:description"
          content="Beleef de reis van jouw dromen met al onze tips en tricks. Ontdek de leukste activiteiten, mooiste plekjes en beste restaurants!"
        />
        <meta property="og:url" content="https://www.reisfeeld.nl/" />
        <meta
          property="og:image"
          content={`https://www.reisfeeld.nl${HeaderImage.src}`}
        />

        <title>{metaData.title}</title>
        <meta name="description" content={metaData.description} />

        <meta property="og:title" content={metaData.title} />
        <meta property="og:description" content={metaData.description} />
        <meta property="og:url" content={metaData.url} />

        <meta
          property="og:image"
          content={`https://www.reisfeeld.nl${HeaderImage.src}`}
        />
      </Head> */}

      <div>
        {/* <Head>
        <title>ReisFeeld.nl | Jouw avontuur, ons verhaal!</title>
          <meta
            name="description"
            content="Beleef de reis van jouw dromen met al onze tips en tricks. Ontdek de leukste activiteiten, mooiste plekjes en beste restaurants!"
          />

          <meta
            property="og:title"
            content="ReisFeeld.nl | Jouw avontuur, ons verhaal!"
          />
          <meta
            property="og:description"
            content="Beleef de reis van jouw dromen met al onze tips en tricks. Ontdek de leukste activiteiten, mooiste plekjes en beste restaurants!"
          />
          <meta property="og:url" content="https://www.reisfeeld.nl/" />
        
          <title>{metaData.title}</title>
          <meta name="description" content={metaData.description} />

          <meta property="og:title" content={metaData.title} />
          <meta property="og:description" content={metaData.description} />
          <meta property="og:url" content={metaData.url} />

          <meta
            property="og:image"
            content={`https://www.reisfeeld.nl${metaData.image}`}
          />
        </Head> */}

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

// export const getServerSideProps = async (context: any) => {
//   const blogData = require("../data/blogs.json");
// const route = context.resolvedUrl;
// const allMetaData = require("../data/metaData.json");
// const thumbnailImg = require("../assets/header/home.webp");
// let metaData: HomeProps["metaData"] | {} = {};

// Object.keys(allMetaData).map((dRoute) => {
//   if (dRoute == route) {
//     metaData = { ...allMetaData[dRoute], image: thumbnailImg.default.src };
//   }
// });

//   return {
//     props: {
//       blogData,
//       metaData,
//     },
//   };
// };

export default Home;
