export interface ImageProps {
  src: string;
  alt: string;
}

export interface ImagesProps {
  src: {
    [image: string]: string | undefined;
  };
  alt: {
    [image: string]: string | undefined;
  };
}

export interface BlogProps {
  id: number;
  metaTitle: string;
  metaDesc: string;
  date: string;
  href: string;
  coverImage: ImageProps;
  title: string;
  headers: string[];
  content: {
    [section: string]:
      | {
          text: string;
          image?: ImageProps;
        }
      | undefined;
  };
  images: ImagesProps;
  featured?: string;
  carousel?: boolean;
}

export interface BlogDataProps {
  [country: string]: {
    pageContent: {
      image: ImageProps;
      title: string;
      subTitle: string;
      intro: {
        bestSeason: string;
        currency: string;
        timeDifference: string;
        travelTime: string;
        title: string;
        content: string;
      };
    };
    blogs: {
      [dest: string]: BlogProps[];
    };
  };
}

export interface BlogCountryProps {
  country: string;
  blog: BlogProps;
}
