import { Images } from "@/components/pages/blogs/BlogContent";

// interface Image {
//   src: {
//     [image: string]: string | undefined;
//   };
//   alt: {
//     [image: string]: string | undefined;
//   };
// }

const replaceImageTag = (text: string | undefined, images: Images[]) => {
  // Use a regular expression to find all occurrences of <imageX> tags
  const regex = /<image(\d+)>/g;

  // Replace each occurrence with the corresponding image value
  const replacedText =
    text &&
    text.replace(regex, (match, group1) => {
      const arrKey = group1 - 1;
      return images[arrKey]
        ? `<img src="https:${images[arrKey].fields.file.url}" alt="${images[arrKey].fields.title}" />`
        : match; // If the image key is not found, keep the original tag
    });

  return replacedText;
};

export default replaceImageTag;
