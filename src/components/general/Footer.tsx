import React from "react";
import BaseText from "../typography/BaseText";
import { useAppContext } from "../../config/AppContext";
import ScrollToTopButton from "../pages/overview/ScrollToTopButton";
import LogoBlack from "../../assets/logo/Logo-ReisFeeld-black.svg";
import Socials from "../pages/blogs/Socials";
import H3 from "../typography/H3";
import Link from "next/link";
import ButtonLink from "./ButtonLink";
import Image from "next/image";

const Footer: React.FC = () => {
  const { screenSize } = useAppContext();
  return (
    <div>
      <ScrollToTopButton />
      <div
        className={`relative before:bg-background before:absolute before:inset-0 before:-top-6 before:z-[-99] ${
          screenSize < 750
            ? "pt-6 pb-4 px-[7.5vw] text-center"
            : screenSize < 1000
            ? "pt-7 pb-4 px-[9vw] text-center"
            : screenSize < 1250
            ? "pt-9 pb-5 px-[9vw]"
            : "pt-10 pb-5 px-[10vw]"
        }`}
      >
        <div
          className={`flex ${
            screenSize < 1000
              ? "flex-col justify-center gap-8"
              : "items-start justify-between gap-16 max-w-[1400px] mx-auto"
          }`}
        >
          <div
            className={
              screenSize < 1000 ? "max-w-[550px] mx-auto" : "max-w-[500px]"
            }
          >
            <Link
              className={`block mb-6 w-fit ${screenSize < 1000 && "mx-auto"}`}
              href="/"
            >
              <Image
                width={500}
                height={500}
                className="h-12 w-auto"
                src={LogoBlack}
                alt="Logo Reisfeeld"
              />
            </Link>

            <section
              className={`[&_a]:!w-7 mb-7 ${
                screenSize < 1000
                  ? "[&_a]:!w-7 [&>*]:justify-center [&>h3]:mb-1.5"
                  : "[&_a]:!w-[34px] [&>*]:gap-3.5 [&>h3]:mb-2.5"
              }`}
            >
              <H3>Volg ons op</H3>
              <Socials />
            </section>

            <div>
              <BaseText className="font-medium">
                Lijkt het je leuk om samen te werken? <br /> Stuur ons een
                email!
              </BaseText>
              <Link
                href=""
                onClick={() =>
                  (window.location.href = "mailto:reisfeeld@gmail.com")
                }
                className="underline"
              >
                <BaseText className="mt-1">reisfeeld@gmail.com</BaseText>
              </Link>
            </div>
          </div>

          <nav
            className={`flex flex-wrap gap-3 gap-y-5 [&>a]:h-fit ${
              screenSize < 1000 ? "justify-center" : "max-w-[400px]"
            }`}
          >
            <ButtonLink link="/">Home</ButtonLink>
            <ButtonLink link="/indonesie">Indonesië</ButtonLink>
            <ButtonLink link="/accommodaties">Accommodaties</ButtonLink>
            <ButtonLink link="/over-ons">Over ons</ButtonLink>
          </nav>
        </div>

        <BaseText className="mt-8 text-center">© 2024 Reisfeeld</BaseText>
      </div>
    </div>
  );
};

export default Footer;
