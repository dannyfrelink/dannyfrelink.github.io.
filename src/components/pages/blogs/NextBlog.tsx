import React from "react";
import { useAppContext } from "../../../config/AppContext";
import Link from "next/link";
import BaseText from "../../typography/BaseText";
import H3 from "../../typography/H3";
import Image from "next/image";
import { BlogProps } from "@/helpers/types";

export interface NextBlogProps {
  country: string;
  blog: BlogProps;
  size?: "small" | "large";
}

const NextBlog: React.FC<NextBlogProps> = ({
  country,
  blog,
  size = "small",
}) => {
  const { screenSize } = useAppContext();
  const imageSrc = require(`../../../assets/pages/blogposts/${blog.coverImage.src}`);
  const imageAlt = blog.coverImage.alt;

  return (
    <Link href={`/${country}/${blog.href}`} className="relative block">
      <div className="absolute bottom-0 w-full rounded-2xl h-full opacity-60 bg-gradient-to-t from-gray-700 via-transparent via-80% to-gray-400"></div>
      <Image
        width={500}
        height={500}
        className="rounded-2xl w-full h-full max-h-[400px] object-cover object-center"
        src={imageSrc}
        alt={imageAlt}
      />
      {size === "small" ? (
        <BaseText
          className={`absolute z-10 font-semibold text-primary ${
            screenSize < 750
              ? "bottom-4 inset-x-4"
              : screenSize < 1000
              ? "bottom-4 inset-x-4"
              : screenSize < 1250
              ? "bottom-3 inset-x-3"
              : "bottom-5 inset-x-4"
          }`}
        >
          {blog.title}
        </BaseText>
      ) : (
        <H3
          className={`absolute z-10 font-semibold text-primary ${
            screenSize < 750
              ? "bottom-4 inset-x-4"
              : screenSize < 1000
              ? "bottom-4 inset-x-4"
              : screenSize < 1250
              ? "bottom-3 inset-x-3"
              : "bottom-5 inset-x-4"
          }`}
        >
          {blog.title}
        </H3>
      )}
    </Link>
  );
};

export default NextBlog;
