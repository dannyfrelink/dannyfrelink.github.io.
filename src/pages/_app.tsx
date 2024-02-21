import { AppProvider } from "@/config/AppContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { HelmetProvider } from "react-helmet-async";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <HelmetProvider>
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </HelmetProvider>
  );
}
