import React from "react";
import Nav from "./Nav";
import Button from "../general/Button";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { useAppContext } from "../../config/AppContext";
import Title from "./Title";
import LogoPrimary from "../../assets/logo/Logo-ReisFeeld-primary.svg";
import Link from "next/link";
import Image from "next/image";

export interface HeaderProps {
  HeaderImage: React.FC<JSX.IntrinsicElements["img"]>;
  imageHeight?: "small" | "large";
  title: string;
  subTitle?: string;
  size?: "small" | "large";
  align?: "center" | "bottom";
  isBlog?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  HeaderImage,
  imageHeight = "large",
  title,
  subTitle,
  size = "large",
  align = "center",
  isBlog = false,
}) => {
  const { setNavOpen, screenSize } = useAppContext();

  return (
    <header
      className={`${
        screenSize < 750
          ? size === "large"
            ? "h-[80vh]"
            : "h-[40vh]"
          : "h-[90vh]"
      } text-primary`}
    >
      <div
        className={`absolute w-full z-[-2] [&>img]:w-full [&>img]:object-cover [&>img]:object-center ${
          imageHeight === "large"
            ? "[&>img]:h-full"
            : screenSize < 750
            ? size === "large"
              ? "[&>img]:h-[calc(80vh+24px)]"
              : "[&>img]:h-[calc(40vh+24px)]"
            : "md:[&>img]:h-[calc(90vh+24px)]"
        } ${
          screenSize < 750
            ? size === "large"
              ? "h-full"
              : "h-1/2"
            : "h-[110%]"
        }`}
      >
        <div
          className={`absolute top-0 w-full opacity-70 bg-gradient-to-b from-gray-900 ${
            size === "small" && screenSize < 750
              ? `via-transparent to-gray-900 h-full ${
                  isBlog ? "via-20%" : "via-40%"
                }`
              : "to-transparent h-1/2"
          }`}
        ></div>
        <HeaderImage />
      </div>

      <Button
        onClick={() => setNavOpen(true)}
        className={`fixed top-6 z-[98] ${
          screenSize < 750
            ? "right-4 !py-1.5 !px-2.5"
            : `right-10 !py-2 !px-3 ${screenSize >= 1000 && "hidden"}`
        }`}
      >
        <MenuRoundedIcon />
      </Button>

      <Link
        className={`absolute top-5 ${
          screenSize < 750
            ? "left-4"
            : `left-10 ${screenSize >= 1000 && "hidden"}`
        }`}
        href="/"
      >
        <Image
          width={500}
          height={500}
          className={`block !w-auto ${
            screenSize < 750 ? "!h-12" : "!h-[52px]"
          }`}
          src={LogoPrimary}
          alt="Logo Reisfeeld Wit"
        />
      </Link>

      <Nav />

      <Title
        title={title}
        subTitle={subTitle}
        align={align}
        size={size}
        isBlog={isBlog}
      />
    </header>
  );
};

export default Header;
