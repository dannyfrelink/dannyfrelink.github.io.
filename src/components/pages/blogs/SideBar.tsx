import React, { useCallback, useEffect, useRef, useState } from "react";
import Container from "../../general/Container";
import { useAppContext } from "../../../config/AppContext";
import NextBlogs from "./NextBlogs";
// import { Destination } from "../../../pages/[country]/index";
import H3 from "../../typography/H3";
import TableOfContents from "./TableOfContents";
import Socials from "./Socials";
import { BlogProps } from "@/helpers/types";

export interface SideBarProps {
  country: string;
  blogs: BlogProps[];
  href: string | undefined;
}

const SideBar: React.FC<SideBarProps> = ({ country, blogs, href }) => {
  const { screenSize } = useAppContext();
  const activeBlog = blogs.filter((blog) => blog.href === href)[0];
  const sidebarRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [oldScroll, setOldScroll] = useState<number>(0);
  const [topValue, setTopValue] = useState<number>(0);
  const [initialStick, setInitialStick] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<number>(
    typeof window !== "undefined" ? window.scrollY : 0
  );
  const [scrolledUp, setScrolledUp] = useState<boolean>(false);
  const lastScrolledRef = useRef<number>(scrolled);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    setScrolled(currentScrollY);
    setScrolledUp(lastScrolledRef.current > currentScrollY);
    lastScrolledRef.current = currentScrollY;
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    if (contentRef.current && sidebarRef.current) {
      let viewportHeight = window.innerHeight;
      let contentHeight = contentRef.current.getBoundingClientRect().height;
      let sidebarTop =
        sidebarRef.current.getBoundingClientRect().top + window.scrollY;

      if (scrolled >= sidebarTop) {
        if (scrolledUp) {
          // When the user scrolls back up
          let scrollAmount = oldScroll - scrolled;

          if (topValue > -100) {
            setTopValue((prevValue) => prevValue - scrollAmount);
          } else {
            setTopValue(-100);
          }

          setOldScroll(scrolled);
        } else if (
          initialStick &&
          topValue < contentHeight - viewportHeight + 50
        ) {
          // When the user scrolls back down midway blog
          if (topValue === -100) {
            setTopValue(-40);
          } else {
            let scrollAmount = oldScroll - scrolled;

            setTopValue((prevValue) => prevValue - scrollAmount);
          }

          setOldScroll(scrolled);
        } else {
          // When the user reaches the bottom of the content
          setTopValue(contentHeight - viewportHeight + 50);
          setInitialStick(true);
          setOldScroll(scrolled);
        }

        // Set styling of position and top
        contentRef.current.style.top = initialStick ? `${-topValue}px` : "";
        contentRef.current.style.position = topValue ? "sticky" : "";
      } else {
        setInitialStick(false);

        // Remove styling of position and top
        contentRef.current.style.position = "";
        contentRef.current.style.top = "";
      }
    }
  }, [scrolled, initialStick, oldScroll, scrolledUp, topValue]);

  return (
    <Container
      containerRef={sidebarRef}
      className={`relative rounded-none rounded-tr-2xl ${
        screenSize < 1250
          ? "w-2/6 !px-10"
          : `!px-12 ${screenSize < 1500 ? "w-[30%]" : "!px-16 w-[27.5%]"}`
      }`}
    >
      <div
        ref={contentRef}
        className={`[&>*:not(:last-child)]:mb-10 max-w-[350px]`}
      >
        <TableOfContents headers={activeBlog.headers} />

        <section>
          <H3 className="mb-4">Volg ons op</H3>
          <Socials />
        </section>

        <section>
          <H3
            className={`text-center ${
              screenSize < 750
                ? "mb-3"
                : screenSize < 1000
                ? "mb-4"
                : `!text-left ${screenSize < 1250 ? "mb-4" : "mb-5"}`
            }`}
          >
            Ontdek meer
          </H3>

          <NextBlogs country={country} blogs={blogs} href={href} />
        </section>
      </div>
    </Container>
  );
};

export default SideBar;
