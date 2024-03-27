import React, { useEffect, useState } from "react";
import NextBlog from "./NextBlog";
import { Destination } from "../../../pages/[country]/index";
import { getRandomBlogs } from "../../../helpers/getRandomBlogs";

export interface NextBlogsProps {
  country: string;
  blogs: Destination[];
  href: string | undefined;
}

const NextBlogs: React.FC<NextBlogsProps> = ({ country, blogs, href }) => {
  const optionalBlogs = blogs.filter((blog) => blog.href !== href);
  const [blogArr, setBlogArr] = useState<NextBlogsProps["blogs"]>([]);
  const [oldHref, setOldHref] = useState<string | undefined>("");

  useEffect(() => {
    href !== oldHref && setBlogArr(getRandomBlogs(optionalBlogs, 4));
    setOldHref(href);
  }, [href, oldHref, optionalBlogs]);

  return (
    <article
      className={`grid gap-y-6 grid-rows-[1fr_1fr_1fr_1fr] [&_img]:max-h-[200px]`}
    >
      {blogArr.map((blog, index) => (
        <NextBlog key={index} country={country} blog={blog} />
      ))}
    </article>
  );
};

export default NextBlogs;
