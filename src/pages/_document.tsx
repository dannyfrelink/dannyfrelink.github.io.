import { Html, Head, Main, NextScript } from "next/document";
// import { useRouter } from "next/router";

// const metaData = {
//   "/": {
//     title: "ReisFeeld.nl | Jouw avontuur, ons verhaal!",
//     description:
//       "Beleef de reis van jouw dromen met al onze tips en tricks. Ontdek de leukste activiteiten, mooiste plekjes en beste restaurants!",
//     OG: {
//       title: "ReisFeeld.nl | Jouw avontuur, ons verhaal!",
//       description:
//         "Beleef de reis van jouw dromen met al onze tips en tricks. Ontdek de leukste activiteiten, mooiste plekjes en beste restaurants!",
//       url: "https://www.reisfeeld.nl/",
//     },
//   },
//   "/indonesie": {
//     title: "",
//     description: "",
//     OG: {
//       title: "",
//       description: "",
//       url: "https://www.reisfeeld.nl/indonesie/",
//     },
//   },
//   "/indonesie/:href": {
//     title: "",
//     description: "",
//     OG: {
//       title: "",
//       description: "",
//       url: "https://www.reisfeeld.nl/indonesie/:href",
//     },
//   },
//   "/accommodaties": {
//     title: "",
//     description: "",
//     OG: {
//       title: "",
//       description: "",
//       url: "https://www.reisfeeld.nl/accommodaties/",
//     },
//   },
//   "/over-ons": {
//     title: "",
//     description: "",
//     OG: {
//       title: "",
//       description: "",
//       url: "https://www.reisfeeld.nl/over-ons/",
//     },
//   },
// };

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Tenor+Sans&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap"
          rel="stylesheet"
        />

        <meta property="og:image:width" content="2500" />
        <meta property="og:image:height" content="1667" />
        <meta property="og:image:type" content="image/jpeg" />

        {/* <meta
          property="og:title"
          content="ReisFeeld.nl | Jouw avontuur, ons verhaal!"
        />
        <meta
          property="og:description"
          content="Beleef de reis van jouw dromen met al onze tips en tricks. Ontdek de leukste activiteiten, mooiste plekjes en beste restaurants!"
        />
        <meta property="og:url" content="https://www.reisfeeld.nl/" />

        <meta
          property="og:image"
          content="https://www.reisfeeld.nl/_next/static/media/home.4771d7e1.webp"
        />
        <meta property="og:image:width" content="2500" />
        <meta property="og:image:height" content="1667" />
        <meta property="og:image:type" content="image/jpeg" /> */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
