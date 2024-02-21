import React, { useCallback, useEffect, useRef, useState } from "react";
// import { NavLink } from "react-router-dom";
import Link from "next/link";
import { useAppContext } from "../../config/AppContext";
import CloseButton from "../general/CloseButton";
import LogoBlack from "../../assets/logo/Logo-ReisFeeld-black.svg";
import LogoPrimary from "../../assets/logo/Logo-ReisFeeld-primary.svg";
import Socials from "../pages/blogs/Socials";
import Image from "next/image";

const Nav: React.FC = () => {
  const { screenSize, navOpen, setNavOpen } = useAppContext();
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

  const checkActive = (isActive: boolean) => {
    return isActive ? "font-bold text-[#729172]" : "";
  };

  const handleClick = (e: any) => {
    const target = e.target;
    const tagName = target.tagName.toLowerCase();

    if (navOpen && tagName === "nav") {
      setNavOpen(false);
    }

    if (tagName === "a") {
      setNavOpen(false);
    }
  };

  return (
    <nav
      onClick={handleClick}
      className={`z-[99] ${scrolled > 250 && scrolledUp && "fixed"} ${
        screenSize < 1000 &&
        `fixed h-screen before:fixed before:w-screen before:bg-[#707070] before:opacity-75 ${
          navOpen ? "left-0 before:inset-0" : "-left-[100vw]"
        }`
      }`}
    >
      <Link
        className={`absolute z-[99] top-4 ${
          screenSize < 1000
            ? `left-6 hidden ${navOpen && "!block"}`
            : `${scrolled > 250 && scrolledUp && "!fixed !top-3.5"} ${
                screenSize < 1250 ? "left-[9vw]" : "left-[10vw]"
              }`
        }`}
        href="/"
      >
        <Image
          width={500}
          height={500}
          className={`${
            navOpen && "animate-[menuFadeIn_0.5s_ease-out_forwards]"
          } ${
            screenSize < 750
              ? `h-12`
              : screenSize < 1000
              ? "h-[52px]"
              : `${scrolled > 250 && scrolledUp ? "h-12" : "h-16"}`
          } w-auto`}
          src={
            screenSize < 1000 || (scrolled > 250 && scrolledUp)
              ? LogoBlack
              : LogoPrimary
          }
          alt="Logo ReisFeeld White"
        />
      </Link>

      <ul
        className={`${
          screenSize < 1000
            ? `w-[90vw] max-w-[400px] h-full rounded-r-3xl bg-primary pl-6 pr-4 pt-32 [&>li:not(:last-of-type)]:mb-6 [&>li:last-of-type]:mb-12 hidden ${
                navOpen && "animate-[menuFadeIn_0.5s_ease-out_forwards] !block"
              }`
            : `flex before:top-0 before:inset-x-0 before:h-[4.5rem] before:z-[-1] [&_a:hover]:!text-[#729172] [&_a:focus]:!text-[#729172] ${
                scrolled > 250 && scrolledUp
                  ? "fixed before:fixed top-[22px] before:bg-primary before:shadow-subtle"
                  : "absolute before:absolute top-7 text-primary"
              } ${
                screenSize < 1250
                  ? "right-[9vw] [&>li:not(:last-child)]:mr-6 [&>div]:mr-4"
                  : "right-[10vw] [&>li:not(:last-child)]:mr-10 [&>div]:mr-8"
              }`
        } text-black text-xl [&>li]:font-bold`}
      >
        <CloseButton
          className={`absolute top-6 right-4 cursor-pointer ${
            screenSize >= 1000 && "hidden"
          }`}
          closeMenu={() => setNavOpen(false)}
        />

        <li>
          <Link href="/">Home</Link>
        </li>

        <li>
          <Link href="/indonesie">Indonesië</Link>
        </li>

        <li>
          <Link href="/accommodaties">Accommodaties</Link>
        </li>
        <li>
          <Link href="/over-ons">Over ons</Link>
        </li>

        <div
          className={`[&_a]:!w-9 [&>*]:gap-3.5 ${
            screenSize >= 1000 && "hidden"
          }`}
        >
          <Socials />
        </div>
      </ul>
    </nav>
  );
};

export default Nav;
