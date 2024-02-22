import { AppProvider } from "@/config/AppContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [inBrowser, setInBrowser] = useState(false);
  useEffect(() => setInBrowser(true), []);

  return (
    <>
      {inBrowser ? (
        // running in browser load Auth
        <AppProvider>
          <Component {...pageProps} />
        </AppProvider>
      ) : (
        // building or running in pipeline
        <Component {...pageProps} />
      )}
    </>
  );
}
