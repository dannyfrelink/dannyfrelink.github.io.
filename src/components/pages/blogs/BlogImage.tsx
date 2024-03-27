import { ImageProps } from "@/helpers/types";
import Image from "next/image";
import React from "react";

const BlogImage: React.FC<ImageProps> = ({ src, alt }) => {
  return <Image width={500} height={500} src={src} alt={alt} />;
};

export default BlogImage;
