import { BlogsData, Destination } from "./index";
import {
  Header,
  SideBar,
  Footer,
  BlogContent,
  BottomBar,
  ScrollBar,
} from "@/helpers/dynamicImports";
import { useAppContext } from "../../config/AppContext";
import React from "react";
import Image from "next/image";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { MetadataProps } from "..";

interface BlogProps {
  blog: Destination;
  allBlogs: Destination[];
  metaData: MetadataProps;
}

const BlogPost: React.FC<BlogProps> = React.memo(({ blog, allBlogs }) => {
  const { screenSize } = useAppContext();
  const coverImage = require(`../../assets/pages/blogposts/${blog.coverImage.src}`);
  const images = blog.images;
  const sections = Object.values(blog.content);

  return (
    <ScrollBar>
      <div>
        <Header
          HeaderImage={() => (
            <Image
              width={2000}
              height={1300}
              src={coverImage}
              alt={blog.coverImage.alt}
            />
          )}
          title={blog.title}
          size="small"
          align="bottom"
          isBlog
        />

        <main className="relative">
          <div
            className={`max-w-[1800px] mx-auto ${
              screenSize > 1000 && "flex flex-row-reverse"
            } ${
              screenSize > 1800 &&
              "before:absolute before:inset-0 before:bg-primary before:rounded-2xl"
            }`}
          >
            {screenSize >= 1000 && (
              <SideBar blogs={allBlogs} href={blog.href} />
            )}

            <article
              className={`z-[1] relative ${
                screenSize < 1000
                  ? "[&>section:last-child]:!rounded-b-none"
                  : `[&>section]:rounded-none [&>section:first-child]:rounded-tl-2xl ${
                      screenSize < 1250
                        ? "w-4/6"
                        : screenSize < 1500
                        ? "w-[70%]"
                        : "w-[72.5%]"
                    }`
              }`}
            >
              {sections.map((section, index) => {
                const text = section && section.text;

                return (
                  <BlogContent
                    key={index}
                    index={index}
                    image={section && section.image}
                    text={text}
                    images={images}
                    blog={blog}
                  ></BlogContent>
                );
              })}
            </article>
          </div>
        </main>

        <BottomBar blogs={allBlogs} href={blog.href} />

        <Footer />
      </div>
    </ScrollBar>
  );
});

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params || !params.blog) {
    return {
      notFound: true,
    };
  }

  const data: { blogs: BlogsData } = require("../../data/blogs.json");
  const { blog } = params;

  const allBlogs: Destination[] = [];
  Object.values(data).map((blogArr: any) =>
    Object.values(blogArr).map((blog: any) =>
      blog.map((b: any) => allBlogs.push(b))
    )
  );
  const blogData = allBlogs.find((b) => b.href === blog);

  let metaImage = require(`../../assets/pages/blogposts/${blogData?.coverImage.src}`);
  const metaData = {
    title: blogData?.metaTitle,
    description: blogData?.metaDesc,
    url: `https://www.reisfeeld.nl/indonesie/${blogData?.href}`,
    image: metaImage.default.src,
    fbAppID: blogData?.href,
  };

  return {
    props: {
      blog: blogData,
      allBlogs,
      metaData,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data: { blogs: BlogsData } = require("../../data/blogs.json");

  const paths = Object.values(data.blogs).flatMap((blog) => {
    return blog.map((b) => ({
      params: { blog: b.href },
    }));
  });

  return {
    paths,
    fallback: false,
  };
};

export default BlogPost;
