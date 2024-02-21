import React, { useEffect, useState } from "react";
import Container from "../../general/Container";
import { Destination } from "../../../pages/indonesie/index";
import { useAppContext } from "../../../config/AppContext";
import { getRandomBlogs } from "../../../helpers/getRandomBlogs";
import NextBlog from "./NextBlog";
import H2 from "../../typography/H2";

export interface BottomBarProps {
  blogs: Destination[];
  href: string | undefined;
}

const BottomBar: React.FC<BottomBarProps> = ({ blogs, href }) => {
  const { screenSize } = useAppContext();
  const optionalBlogs = blogs.filter((blog) => blog.href !== href);
  const [blogArr, setBlogArr] = useState<BottomBarProps["blogs"]>([]);
  const [oldHref, setOldHref] = useState<string | undefined>("");

  useEffect(() => {
    href !== oldHref && setBlogArr(getRandomBlogs(optionalBlogs, 4));
    setOldHref(href);
  }, [href, oldHref, optionalBlogs]);

  return (
    <Container className="rounded-t-none">
      <div className="max-w-[1400px] mx-auto">
        <H2
          className={`text-center ${
            screenSize < 750 ? "mb-5" : screenSize < 1250 ? "mb-7" : "mb-9"
          }`}
        >
          Ontdek meer
        </H2>

        <article
          className={`grid gap-6 grid-rows-[1fr_1fr_1fr_1fr] ${
            screenSize > 650 &&
            `grid-cols-2 !grid-rows-[1fr_1fr] ${
              screenSize >= 1250 && "!gap-10"
            }`
          }`}
        >
          {blogArr.map((blog, index) => (
            <NextBlog key={index} blog={blog} size="large" />
          ))}
        </article>
      </div>
    </Container>
  );
};

export default BottomBar;
