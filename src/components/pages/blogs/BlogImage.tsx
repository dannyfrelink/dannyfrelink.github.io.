import Image from "next/image";
import React from "react";

export interface BlogImageProps {
  src: string;
  alt: string;
}

const BlogImage: React.FC<BlogImageProps> = ({ src, alt }) => {
  return <Image width={500} height={500} src={src} alt={alt} />;
};

export default BlogImage;
