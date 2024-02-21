import { NextBlogsProps } from "../components/pages/blogs/NextBlogs";

const shuffleArray = (array: NextBlogsProps["blogs"]) => {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
};

export const getRandomBlogs = (
	array: NextBlogsProps["blogs"],
	size: number
) => {
	const shuffledArray = [...array];
	shuffleArray(shuffledArray);
	return shuffledArray.slice(0, size);
};
