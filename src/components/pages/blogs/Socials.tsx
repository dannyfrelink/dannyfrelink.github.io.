import React from "react";
import Link from "next/link";
import Image from "next/image";

const Socials: React.FC = () => {
  const socials = [
    {
      src: "icons8-instagram.svg",
      link: "https://www.instagram.com/reis.feeld/",
    },
    {
      src: "icons8-tiktok.svg",
      link: "https://www.tiktok.com/@reis.feeld",
    },
    {
      src: "icons8-youtube.svg",
      link: "https://www.youtube.com/@LisatenHoope",
    },
    {
      src: "icons8-facebook.svg",
      link: "https://www.facebook.com/Reisfeeld/",
    },
  ];

  return (
    <div className="flex gap-3 [&>*]:w-10 [&>*:hover>img]:opacity-85 [&>*:focus>img]:opacity-85">
      {socials.map((social, index) => {
        const src = require(`../../../assets/socials/${social.src}`);
        const alt = social.src.split("icons8-")[1].split(".svg")[0];

        return (
          <Link target="_blank" key={index} href={social.link}>
            <Image width={500} height={500} src={src} alt={alt} />
          </Link>
        );
      })}
    </div>
  );
};

export default Socials;
