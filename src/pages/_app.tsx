import { AppProvider } from "@/config/AppContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, router, pageProps }: AppProps) {
  // const route = router.pathname;
  const metaData = pageProps.metaData;
  // const metaData = allMetaData[route];

  console.log("Route: ", router.pathname);
  console.log("Meta data: ", metaData);

  return (
    <>
      <Head>
        <title>{metaData.title}</title>
        <meta name="description" content={metaData.description} />

        <meta property="og:title" content={metaData.title} />
        <meta property="og:description" content={metaData.description} />
        <meta property="og:url" content={metaData.url} />

        <meta
          property="og:image"
          content={`https://www.reisfeeld.nl${metaData.image}`}
        />
      </Head>
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </>
  );
}

export const getServerSideProps = async (context: any) => {
  const blogData = require("../data/blogs.json");
  const allMetaData = require("../data/metaData.json");

  return {
    props: {
      blogData,
      allMetaData,
    },
  };
};
