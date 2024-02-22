import HeaderImage from "../assets/header/about.webp";
import AboutImage from "../assets/pages/about/couple.jpg";
import { useAppContext } from "../config/AppContext";
import {
  Header,
  Container,
  BaseText,
  H2,
  Footer,
  ScrollBar,
} from "@/helpers/dynamicImports";
import React, { useEffect, useState } from "react";
// import Head from "next/head";
import Image from "next/image";
import { MetadataProps } from ".";
import { GetStaticProps } from "next";

interface AboutProps {
  metaData: MetadataProps;
}

const About: React.FC<AboutProps> = React.memo(() => {
  const { screenSize } = useAppContext();
  const [headerImage, setHeaderImage] = useState<string>();
  useEffect(() => {
    headerImage !== "" && setHeaderImage("../assets/header/about.webp");
  }, [headerImage, setHeaderImage]);

  return (
    <ScrollBar>
      <div>
        {/* <Head>
          <title>Reisfeeld | Over ons</title>
          <meta
            name="description"
            content="Met onze tips en ervaringen hopen wij jouw voorbereidingen én reis een stukje leuker te maken. En wij zijn nog lang niet klaar met reizen!"
          /> */}

        {/* <meta property="og:title" content="Reisfeeld | Over ons" />
          <meta
            property="og:description"
            content="Met onze tips en ervaringen hopen wij jouw voorbereidingen én reis een stukje leuker te maken. En wij zijn nog lang niet klaar met reizen!"
          />
          <meta
            property="og:url"
            content="https://www.reisfeeld.nl/over-ons/"
          />

          <meta
            name="og:image"
            content={`https://www.reisfeeld.nl${HeaderImage.src}`}
          />
          <meta property="og:image:width" content="2500" />
          <meta property="og:image:height" content="1667" />
          <meta property="og:image:type" content="image/jpeg" /> */}
        {/* </Head> */}

        <Header
          HeaderImage={() => (
            <Image
              width={2000}
              height={1300}
              src={HeaderImage}
              alt="Ijen Vulkaan"
            />
          )}
          imageHeight="small"
          title="Over ReisFeeld"
        />

        <Container>
          <section
            className={`${
              screenSize < 750
                ? "[&>*:not(:last-child)]:mb-5"
                : screenSize < 1250
                ? "[&>*:not(:last-child)]:mb-8"
                : "flex justify-between max-w-[1400px] mx-auto"
            }`}
          >
            <article
              className={`max-w-[750px] ${
                screenSize < 750
                  ? "[&>p:not(:last-child)]:mb-3 mx-auto text-center"
                  : screenSize < 1250
                  ? "[&>p:not(:last-child)]:mb-3.5 text-center mx-auto"
                  : "[&>p:not(:last-child)]:mb-4"
              }`}
            >
              <H2 className={screenSize < 1250 ? "mb-4" : "mb-6"}>
                Hi, wij zijn Danny en Lisa!
              </H2>
              <BaseText>
                In 2018 zijn wij voor het eerst voor acht maanden samen op reis
                geweest en we voelde allebei dat we dit veel te leuk vonden.
                Sinds 2018 hebben wij dan ook meerdere reizen gemaakt en in 2022
                hebben we zelfs vijf maanden op Bali gewoond. We zijn dan ook
                allebei een beetje verliefd geworden op Indonesië en komen hier
                graag terug.
              </BaseText>
              <BaseText>
                Geregeld krijgen we vragen over onze reizen en we vinden het dan
                ook geweldig om hierover te vertellen. Danny werkt als
                webdeveloper en Lisa houdt zich bezig met Marketing, de perfecte
                combinatie om een reisblog te starten! Hierdoor kunnen wij ons
                werk combineren met onze passie, reizen natuurlijk!
              </BaseText>

              <BaseText>
                We zullen al onze reizen, tips, accommodaties en veel meer gaan
                delen op Reisfeeld.nl.
              </BaseText>

              {screenSize >= 1250 && (
                <div className="[&>p:not(:last-of-type)]:mb-4">
                  <BaseText>
                    Reisfeeld heeft eigenlijk drie betekenissen. Natuurlijk
                    staat het woord ‘reis’ erin, wat doelt op onze reisverhalen.
                    Daarnaast kan je dit woord op zijn Engels uitspreken,
                    waardoor ‘rice field’ ontstaat. Dit verwijst naar de
                    prachtige rijstvelden op Bali. Als laatste staat het woord
                    ‘feel’ erin. Dit is de Engelse vertaling van ‘gevoel’ en
                    verwijst naar ons gevoel van geluk als wij aan het reizen
                    zijn. Een naam met veel betekenis dus.
                  </BaseText>
                  <BaseText>
                    Met onze tips en ervaringen hopen wij jouw voorbereidingen
                    én reis een stukje leuker te maken!
                  </BaseText>
                </div>
              )}
            </article>

            <Image
              width={500}
              height={500}
              className={`w-full max-w-[500px] max-h-[400px] object-cover object-[50%_75%] mx-auto rounded-2xl shadow-subtle ${
                screenSize >= 1250 &&
                `mr-0 my-auto max-h-[500px] ${
                  screenSize < 1400 ? "ml-16" : "ml-16"
                } `
              }`}
              src={AboutImage}
              alt="Us"
            />

            {screenSize < 1250 && (
              <article
                className={`max-w-[750px] mx-auto ${
                  screenSize < 750
                    ? "[&>p:not(:last-of-type)]:mb-3 text-center"
                    : screenSize < 1250
                    ? "[&>p:not(:last-of-type)]:mb-3.5 text-center"
                    : "[&>p:not(:last-of-type)]:mb-4"
                }`}
              >
                <BaseText>
                  De naam heeft eigenlijk drie betekenissen. Natuurlijk staat
                  het woord ‘reis’ erin, wat doelt op onze reisverhalen.
                  Daarnaast kan je dit woord op zijn Engels uitspreken, waardoor
                  ‘Ricefield’ ontstaat. Dit verwijst naar de prachtige
                  rijstvelden op Bali. Als laatste staat het woord ‘feel’ erin.
                  Dit is de Engelse vertaling van ‘gevoel’ en verwijst naar ons
                  gevoel van geluk als wij aan het reizen zijn. Een naam met
                  veel betekenis dus.
                </BaseText>
                <BaseText>
                  Met onze tips en ervaringen hopen wij jouw voorbereidingen én
                  reis een stukje leuker te maken!
                </BaseText>
              </article>
            )}
          </section>
        </Container>

        <Footer />
      </div>
    </ScrollBar>
  );
});

export const getStaticProps: GetStaticProps<AboutProps> = async () => {
  const allMetaData: {
    [path: string]: MetadataProps;
  } = require("../data/metaData.json");

  return {
    props: {
      metaData: allMetaData["/over-ons"],
    },
  };
};

export default About;
