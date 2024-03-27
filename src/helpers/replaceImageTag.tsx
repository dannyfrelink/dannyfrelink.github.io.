import { ImagesProps } from "./types";

const replaceImageTag = (text: string | undefined, images: ImagesProps) => {
  // Use a regular expression to find all occurrences of <imageX> tags
  const regex = /<image(\d+)>/g;

  // Replace each occurrence with the corresponding image value
  const replacedText =
    text &&
    text.replace(regex, (match, group1) => {
      const imageKey = `image${group1}`;
      return images.src[imageKey]
        ? `<img src="${images.src[imageKey]}" alt="${images.alt[imageKey]}" />`
        : match; // If the image key is not found, keep the original tag
    });

  return replacedText;
};

export default replaceImageTag;
