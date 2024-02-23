import { AppProvider } from "@/config/AppContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import * as ga from "../helpers/gtag";

export default function App({ Component, pageProps }: AppProps) {
  const metaData = pageProps.metaData;
  const router = useRouter();
  const route = router.pathname;

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      ga.pageview(url);
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        {route !== "/_error" && (
          <>
            <title>{metaData.title}</title>
            <meta name="description" content={metaData.description} />

            <meta property="og:title" content={metaData.title} />
            <meta property="og:description" content={metaData.description} />
            <meta property="og:url" content={metaData.url} />
            <meta property="og:type" content="website" />
            <meta
              property="og:image"
              content={`https://www.reisfeeld.nl${metaData.image}`}
            />

            <meta property="fb:app_id" content={metaData.fbAppID} />

            <link rel="canonical" href={metaData.url} key="canonical" />
          </>
        )}

        {/* Google Analytics */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${ga.GA_TRACKING_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
  
              gtag('config', '${ga.GA_TRACKING_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
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
