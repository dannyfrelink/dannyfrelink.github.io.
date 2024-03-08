import { Destination } from "./index";
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
import { MetadataProps } from "..";
import { client } from "@/helpers/contentful";

interface BlogProps {
  blog: Destination;
  allBlogs: Destination[];
  metaData: MetadataProps;
}

const BlogPost: React.FC<BlogProps> = React.memo(({ blog, allBlogs }) => {
  const { screenSize } = useAppContext();
  const imageSrc = `https:${blog.coverImage.fields.file.url}`;
  const imageAlt = blog.coverImage.fields.title;
  const images = blog.images;
  const sections = Object.values(blog.content);

  return (
    <ScrollBar>
      <div>
        <Header
          HeaderImage={() => (
            <Image width={2000} height={1300} src={imageSrc} alt={imageAlt} />
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
                const content = section.fields;
                const text = section && content.text;

                console.log(images);

                return (
                  <BlogContent
                    key={index}
                    index={index}
                    image={section && content.image}
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

  const contentfulRes = await client.getEntries({ content_type: "blog" });
  const data = contentfulRes.items;
  const allBlogs = data.map((b: { fields: Destination }) => b.fields);
  const { blog } = params;
  const blogData = allBlogs.find((b: Destination) => b.href === blog);

  let metaImage = `https:${blogData.coverImage.fields.file.url}`;
  const metaData = {
    title: blogData?.metaTitle,
    description: blogData?.metaDesc,
    url: `https://www.reisfeeld.nl/indonesie/${blogData?.href}`,
    image: metaImage,
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
  const contentfulRes = await client.getEntries({ content_type: "blog" });
  const data = contentfulRes.items;
  const allBlogs = data.map((b: { fields: Destination }) => b.fields);

  const paths = allBlogs.flatMap((blog: Destination) => {
    return {
      params: { blog: blog.href },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export default BlogPost;
