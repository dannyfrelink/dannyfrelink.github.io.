import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

const imageURL = "../../assets/header/blogs.jpg";
const image1 = fetch(new URL(imageURL, import.meta.url)).then((res) =>
  res.blob()
);

export default async function handler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const hasTitle = searchParams.has("title");
    const title = hasTitle
      ? searchParams.get("title")?.slice(0, 100)
      : "ReisFeeld.nl | Jouw avontuur, ons verhaal!";

    const imageData = await image1;

    console.log("imageData: ", imageData);

    const reader = new FileReader();

    reader.readAsDataURL(imageData);
    reader.onloadend = () => {
      const base64data = reader.result;

      return new ImageResponse(
        (
          <div
            style={{
              fontSize: 40,
              color: "black",
              background: "white",
              width: "100%",
              height: "100%",
              padding: "50px 200px",
              textAlign: "center",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img width={2000} height={1300} src={base64data} />
          </div>
        ),
        {
          width: 1200,
          height: 630,
        }
      );
    };
  } catch (err) {
    return new Response("Failed to generate OG image", { status: 500 });
  }
}
