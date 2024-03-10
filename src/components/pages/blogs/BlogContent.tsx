import React from "react";
import Container from "../../general/Container";
import { useAppContext } from "../../../config/AppContext";
import replaceImageTag from "../../../helpers/replaceImageTag";
import parseHTMLText from "../../../helpers/parseHTMLText";
import H2 from "../../typography/H2";
import TableOfContents from "./TableOfContents";
import { Destination } from "../../../pages/indonesie/index";
import Image from "next/image";

export interface Images {
  src: {
    [image: string]: string | undefined;
  };
  alt: {
    [image: string]: string | undefined;
  };
}

export interface BlogContentProps {
  index: number;
  image?: {
    src: string;
    alt: string;
  };
  text: string | undefined;
  images: Images;
  blog: Destination;
}

const BlogContent: React.FC<BlogContentProps> = ({
  index,
  image,
  text,
  images,
  blog,
}) => {
  const { screenSize } = useAppContext();
  const imageSrc =
    image && require(`../../../assets/pages/blogposts/${image.src}`);
  const imageAlt = image && image.alt;

  const parsedImg = replaceImageTag(text, images);
  const parsedText = parseHTMLText(parsedImg, images);

  return (
    <>
      <Container
        className={
          screenSize > 1800 ? `!pl-0 ${screenSize > 2400 && "!pr-[5vw]"}` : ""
        }
      >
        {index === 0 && (
          <div className="mb-4">
            <H2 className="mb-3">{blog.title}</H2>
            {screenSize < 1000 && <TableOfContents headers={blog.headers} />}
          </div>
        )}

        <article
          className={`[&>img]:w-full [&_img]:rounded-2xl [&_img]:shadow-subtle [&>img]:object-center [&>img]:object-cover [&>img]:max-h-[500px] [&_h3]:font-medium [&_h4]:mt-5 ${
            screenSize < 1000
              ? "[&>img]:h-[50.3vw] [&>div>img]:h-[62.6vw]"
              : screenSize < 1250 && "[&>img]:h-[30vw] [&>div>img]:h-[37.2vw]"
          } ${
            screenSize < 750
              ? "[&>*:not(:last-child)]:mb-3 [&>div:not(:first-child)_h3]:mt-6 [&_h3]:!mb-2 [&>img:not(:last-child)]:mb-4 [&>img]:mt-4 [&>img]:h-[52vw] [&>div>img]:h-[65.1vw]"
              : screenSize < 1250
              ? "[&>*:not(:last-child)]:mb-3.5 [&>div:not(:first-child)_h3]:mt-7 [&_h3]:!mb-2.5 [&>img:not(:last-child)]:mb-6 [&>img]:mt-6 "
              : "[&>*:not(:last-child)]:mb-4 [&>div:not(:first-child)_h3]:mt-14 [&_h3]:!mb-3 [&>img:not(:last-child)]:mb-8 [&>img]:mt-8 [&>img]:h-[30.7vw] [&>img]:max-h-[550px] [&>div>img]:h-[38.2vw] [&>div>img]:max-h-[800px]"
          }`}
        >
          {parsedText}
        </article>
      </Container>
      {imageSrc && imageAlt && (
        <div
          className={`w-full relative ${
            screenSize < 550
              ? "h-[60vh]"
              : screenSize < 750
              ? "h-[75vh]"
              : "h-[85vh] max-h-[1000px]"
          }`}
        >
          <Image
            width={500}
            height={500}
            className={`absolute w-full z-[-99] max-h-[1000px] object-cover object-center -top-6 ${
              screenSize < 550
                ? "h-[calc(60vh+48px)]"
                : screenSize < 750
                ? "h-[calc(75vh+48px)]"
                : "h-[calc(85vh+48px)]"
            }`}
            src={imageSrc}
            alt={imageAlt}
          />
        </div>
      )}
    </>
  );
};

export default BlogContent;
