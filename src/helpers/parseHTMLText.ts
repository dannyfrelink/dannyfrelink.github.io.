import React from "react";
import BaseText from "@/components/typography/BaseText";
import H3 from "@/components/typography/H3";
import H4 from "@/components/typography/H4";
import BlogImage from "@/components/pages/blogs/BlogImage";
import { Element } from "react-scroll";
import Link from "next/link";
import { ImageProps } from "./types";

interface TextProps {
  children: React.ReactNode;
  id?: string;
  className?: string | null;
}

interface AnchorProps {
  href: string | null;
}

interface TagToComponentMap {
  [key: string]: React.FC<AnchorProps | TextProps | ImageProps> | undefined;
}

const tagToComponent: TagToComponentMap = {
  a: Link as React.FC<AnchorProps | TextProps | ImageProps>,
  p: BaseText as React.FC<AnchorProps | TextProps | ImageProps>,
  image: BlogImage as React.FC<AnchorProps | TextProps | ImageProps>,
  h4: H4 as React.FC<AnchorProps | TextProps | ImageProps>,
  h3: H3 as React.FC<AnchorProps | TextProps | ImageProps>,
};

function parseHTMLText(text: string | undefined, images: any) {
  // Create a new HTML document
  const doc = text && new DOMParser().parseFromString(text, "text/html");

  // Iterate over each element in the body and create corresponding React components
  const reactComponents =
    doc &&
    Array.from(doc.body.children).map((element, index) => {
      const tagName = element.tagName.toLowerCase();
      const TagComponent = tagToComponent[tagName];

      if (tagName === "img") {
        // If the element is an <img/> tag, replace it with <BlogImage>
        const src =
          require(`../assets/pages/blogposts/${element.getAttribute("src")}`) ||
          "";
        const alt = element.getAttribute("alt") || "";

        return React.createElement(BlogImage, {
          key: index,
          src,
          alt,
        });
      } else if (tagName === "div") {
        // If the element is a <div> tag, parse HTML children as well
        const className = element.getAttribute("class");
        const divContent: any = parseHTMLText(element.innerHTML, images);

        return React.createElement(
          "div",
          { key: index, className },
          divContent
        );
      } else if (tagName === "ul") {
        // If the element is a <div> tag, parse HTML children as well
        const className = element.getAttribute("class");
        const ulContent: any = parseHTMLText(element.innerHTML, images);

        return React.createElement("ul", { key: index, className }, ulContent);
      } else if (tagName === "li") {
        // If the element is a <div> tag, parse HTML children as well
        return React.createElement("li", {
          key: index,
          children: element.innerHTML.replaceAll("&amp;", "&"),
        });
      } else if (tagName === "a") {
        // If the element is an <a> tag, recursively parse its children
        return React.createElement("a", {
          key: index,
          href: element.getAttribute("href"),
          target: element.getAttribute("target"),
          children: React.createElement("a", {
            children: element.innerHTML.replaceAll("&amp;", "&"),
          }),
        });
      } else if (TagComponent) {
        // If a mapping exists, create the React component
        const name = element.innerHTML.split(" ").join("-").toLowerCase();

        if (tagName === "h3") {
          // If h3 tag, create Element component with H3 component inside
          return React.createElement(Element, {
            key: index,
            name: name.replaceAll("&amp;", "&"),
            children: React.createElement(TagComponent, {
              children: element.innerHTML.replaceAll("&amp;", "&"),
            }),
          });
        } else if (tagName === "p") {
          // If p tag, create BaseText component with given class attribute
          const className = element.getAttribute("class");

          return React.createElement(TagComponent, {
            key: index,
            children: element.innerHTML.replaceAll("&amp;", "&"),
            className,
          });
        } else {
          // Render leftover TagComponent elements
          return React.createElement(TagComponent, {
            key: index,
            children: element.innerHTML,
          });
        }
      } else {
        // If no mapping exists, render the original HTML element
        return React.createElement(tagName, { key: index }, element.innerHTML);
      }
    });

  return reactComponents;
}

export default parseHTMLText;
