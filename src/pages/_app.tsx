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
        {route !== "/_error" && route !== "/_offline" && (
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

        {/* Google Knowledge Panel */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Reisfeeld",
              url: "https://reisfeeld.nl",
              logo: `https://reisfeeld.nl/favicon.ico`,
              image:
                "https://reisfeeld.nl/_next/static/media/home.4771d7e1.webp",
              sameAs: [
                "https://www.instagram.com/reis.feeld/",
                "https://www.tiktok.com/@reisfeeld",
                "https://www.facebook.com/Reisfeeld",
                "https://www.youtube.com/@LisatenHoope",
              ],
              description:
                "Reisfeeld is een reisblog van Danny & Lisa. Zij delen persoonlijke ervaringen in het buitenland en geven tips over wat je wel en niet moet doen. Ook de fijnste accommodaties waar zij hebben verbleven worden hierop vermeld.",
            }),
          }}
        />
      </Head>

      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </>
  );
}
