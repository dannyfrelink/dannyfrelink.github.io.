import dynamic from "next/dynamic";

import { HeaderProps } from "@/components/header/Header";
import { TitleProps } from "@/components/header/Title";

import { BaseTextProps } from "@/components/typography/BaseText";
import { H1Props } from "@/components/typography/H1";
import { H2Props } from "@/components/typography/H2";
import { H3Props } from "@/components/typography/H3";
import { H4Props } from "@/components/typography/H4";

import { ButtonProps } from "@/components/general/Button";
import { ButtonLinkProps } from "@/components/general/ButtonLink";
import { CloseButtonProps } from "@/components/general/CloseButton";
import { ContainerProps } from "@/components/general/Container";
import { DetailsProps } from "@/components/general/Details";
import { ScrollBarProps } from "@/components/general/ScrollBar";

import { BlogContentProps } from "@/components/pages/blogs/BlogContent";
import { ImageProps } from "./types";
import { BottomBarProps } from "@/components/pages/blogs/BottomBar";
import { CountryTagProps } from "@/components/pages/blogs/CountryTag";
import { NextBlogProps } from "@/components/pages/blogs/NextBlog";
import { NextBlogsProps } from "@/components/pages/blogs/NextBlogs";
import { SideBarProps } from "@/components/pages/blogs/SideBar";
import { TableOfContentsProps } from "@/components/pages/blogs/TableOfContents";

import { CarouselProps } from "@/components/pages/home/Carousel";
import { FeaturedProps } from "@/components/pages/home/Featured";

import { AccommodationListProps } from "@/components/pages/overview/AccommodationList";
import { IntroOverviewProps } from "@/components/pages/overview/IntroOverview";
import { ListOverviewProps } from "@/components/pages/overview/ListOverview";
import { OverviewProps } from "@/components/pages/overview/Overview";

const dynamicComp = (comp: string) => {
  return dynamic(() => import(`../components/${comp}`), {
    ssr: false,
  });
};

// Header components
export const Nav = dynamicComp("header/Nav");
export const Header = dynamic<HeaderProps>(
  () => import(`../components/header/Header`),
  {
    ssr: false,
  }
);
export const Title = dynamic<TitleProps>(
  () => import(`../components/header/Title`),
  {
    ssr: false,
  }
);

// Typography compenents
export const BaseText = dynamic<BaseTextProps>(
  () => import(`../components/typography/BaseText`),
  {
    ssr: false,
  }
);
export const H1 = dynamic<H1Props>(
  () => import(`../components/typography/H1`),
  {
    ssr: false,
  }
);
export const H2 = dynamic<H2Props>(
  () => import(`../components/typography/H2`),
  {
    ssr: false,
  }
);
export const H3 = dynamic<H3Props>(
  () => import(`../components/typography/H3`),
  {
    ssr: false,
  }
);
export const H4 = dynamic<H4Props>(
  () => import(`../components/typography/H4`),
  {
    ssr: false,
  }
);

// General compenents
export const Footer = dynamicComp("general/Footer");
export const Button = dynamic<ButtonProps>(
  () => import(`../components/general/Button`),
  {
    ssr: false,
  }
);
export const ButtonLink = dynamic<ButtonLinkProps>(
  () => import(`../components/general/ButtonLink`),
  {
    ssr: false,
  }
);
export const CloseButton = dynamic<CloseButtonProps>(
  () => import(`../components/general/CloseButton`),
  {
    ssr: false,
  }
);
export const Container = dynamic<ContainerProps>(
  () => import(`../components/general/Container`),
  {
    ssr: false,
  }
);
export const Details = dynamic<DetailsProps>(
  () => import(`../components/general/Details`),
  {
    ssr: false,
  }
);
export const ScrollBar = dynamic<ScrollBarProps>(
  () => import(`../components/general/ScrollBar`),
  {
    ssr: false,
  }
);

// Blogs page compenents
export const Socials = dynamicComp("pages/blogs/Socials");
export const BlogContent = dynamic<BlogContentProps>(
  () => import(`../components/pages/blogs/BlogContent`),
  {
    ssr: false,
  }
);
export const BlogImage = dynamic<ImageProps>(
  () => import(`../components/pages/blogs/BlogImage`),
  {
    ssr: false,
  }
);
export const BottomBar = dynamic<BottomBarProps>(
  () => import(`../components/pages/blogs/BottomBar`),
  {
    ssr: false,
  }
);
export const CountryTag = dynamic<CountryTagProps>(
  () => import(`../components/pages/blogs/CountryTag`),
  {
    ssr: false,
  }
);
export const NextBlog = dynamic<NextBlogProps>(
  () => import(`../components/pages/blogs/NextBlog`),
  {
    ssr: false,
  }
);
export const NextBlogs = dynamic<NextBlogsProps>(
  () => import(`../components/pages/blogs/NextBlogs`),
  {
    ssr: false,
  }
);
export const SideBar = dynamic<SideBarProps>(
  () => import(`../components/pages/blogs/SideBar`),
  {
    ssr: false,
  }
);
export const TableOfContents = dynamic<TableOfContentsProps>(
  () => import(`../components/pages/blogs/TableOfContents`),
  {
    ssr: false,
  }
);

// Home page compenents
export const Carousel = dynamic<CarouselProps>(
  () => import(`../components/pages/home/Carousel`),
  {
    ssr: false,
  }
);
export const Featured = dynamic<FeaturedProps>(
  () => import(`../components/pages/home/Featured`),
  {
    ssr: false,
  }
);

// Overview page compenents
export const ScrollToTopButton = dynamicComp(
  "pages/overview/ScrollToTopButton"
);
export const AccommodationList = dynamic<AccommodationListProps>(
  () => import(`../components/pages/overview/AccommodationList`),
  {
    ssr: false,
  }
);
export const IntroOverview = dynamic<IntroOverviewProps>(
  () => import(`../components/pages/overview/IntroOverview`),
  {
    ssr: false,
  }
);
export const ListOverview = dynamic<ListOverviewProps>(
  () => import(`../components/pages/overview/ListOverview`),
  {
    ssr: false,
  }
);
export const Overview = dynamic<OverviewProps>(
  () => import(`../components/pages/overview/Overview`),
  {
    ssr: false,
  }
);
