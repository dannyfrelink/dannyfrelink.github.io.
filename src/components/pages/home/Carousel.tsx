import React, { useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import H3 from "../../typography/H3";
import { useAppContext } from "../../../config/AppContext";
import Link from "next/link";
import Image from "next/image";
import { BlogProps } from "@/helpers/types";

export interface CarouselProps {
  items: {
    country: string;
    blog: BlogProps;
  }[];
}

const Carousel: React.FC<CarouselProps> = ({ items }) => {
  const { screenSize } = useAppContext();
  const sliderRef = useRef<Slider>(null);
  const [autoplaySpeed, setAutoplaySpeed] = useState(2500);
  items.sort((a, b) => {
    const dateA = new Date(a.blog.date).getTime();
    const dateB = new Date(b.blog.date).getTime();

    return dateB - dateA;
  });

  const nextSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const prevSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const handleAfterChange = (currentSlide: number) => {
    if (currentSlide > 0) {
      setAutoplaySpeed(3500);
    }
  };

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: screenSize < 1800 ? 1 : 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding:
      screenSize > 750
        ? screenSize < 1000
          ? "20%"
          : screenSize < 1800
          ? "28%"
          : "0"
        : "0",
    autoplay: true,
    autoplaySpeed: autoplaySpeed,
    afterChange: handleAfterChange,
    appendDots: (dots: React.ReactNode) => (
      <div>
        <button onClick={prevSlide}>
          <ArrowBackIosRoundedIcon
            className={screenSize > 750 ? "!text-3xl" : ""}
          />
        </button>
        <ul
          className={`flex justify-center list-none [&>li>button::before]:!text-tertair [&>li>button::before]:flex [&>li>button::before]:items-center ${
            screenSize < 750
              ? "mx-2 [&>li>button::before]:!text-base"
              : screenSize < 1250
              ? "mx-3 [&>li]:!mx-3 [&>li>button::before]:!text-lg [&>li>button::before]:!top-[0.1rem]"
              : "mx-4 [&>li]:!mx-4 [&>li>button::before]:!text-xl [&>li>button::before]:!top-[0.1rem]"
          }`}
        >
          {dots}
        </ul>
        <button onClick={nextSlide}>
          <ArrowForwardIosRoundedIcon
            className={screenSize > 750 ? "!text-3xl" : ""}
          />
        </button>
      </div>
    ),
  };

  return (
    <Slider
      ref={sliderRef}
      {...settings}
      className={`[&>div.slick-dots]:!flex [&>div.slick-dots]:items-center [&>div.slick-dots]:justify-center [&>div.slick-dots]:relative [&>div.slick-dots]:bottom-0 ${
        screenSize < 750
          ? "[&>div.slick-dots]:mt-4 [&>div.slick-list>div>div]:px-1"
          : `${
              screenSize < 1250
                ? "[&>div.slick-list>div>div]:px-3"
                : screenSize < 1500
                ? "[&>div.slick-list>div>div]:px-7"
                : "[&>div.slick-list>div>div]:px-10"
            } [&>div.slick-dots]:mt-6 [&>div.slick-list>div>div]:pb-3 [&>div.slick-list>div>div]:pt-3`
      }`}
    >
      {items.map((item, index) => {
        const imageSrc = require(`../../../assets/pages/blogposts/${item.blog.coverImage.src}`);
        const imageAlt = `Slide ${index + 1} ${item.blog.coverImage.alt}`;

        return (
          <Link
            href={`/${item.country}/${item.blog.href}`}
            className="relative"
            key={index}
          >
            <div className="absolute bottom-0 w-full rounded-2xl h-full opacity-60 bg-gradient-to-t from-gray-700 via-transparent via-80% to-gray-400"></div>
            <Image
              width={500}
              height={500}
              src={imageSrc}
              alt={imageAlt}
              className={`w-full object-cover object-center rounded-2xl ${
                screenSize < 750
                  ? "h-96"
                  : `shadow-subtle ${
                      screenSize < 1250 ? "h-[420px]" : "h-[470px]"
                    }`
              }`}
            />

            <H3 color="white" className="absolute bottom-6 w-[90%] left-[5%]">
              {item.blog.title}
            </H3>
          </Link>
        );
      })}
    </Slider>
  );
};

export default Carousel;
