import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useAppContext } from "../../config/AppContext";
import CloseButton from "../general/CloseButton";
import LogoBlack from "../../assets/logo/Logo-ReisFeeld-black.svg";
import LogoMainBlack from "../../assets/logo/Logo-ReisFeeld-main-black.svg";
import LogoPrimary from "../../assets/logo/Logo-ReisFeeld-primary.svg";
import Socials from "../pages/blogs/Socials";
import Image from "next/image";
import { useRouter } from "next/router";
import MenuDropdown from "../general/MenuDropdown";

interface NavProps {
  textColor?: "black" | "primary";
}

const Nav: React.FC<NavProps> = ({ textColor = "primary" }) => {
  const { screenSize, navOpen, setNavOpen } = useAppContext();
  const [scrolled, setScrolled] = useState<number>(
    typeof window !== "undefined" ? window.scrollY : 0
  );
  const [scrolledUp, setScrolledUp] = useState<boolean>(false);
  const lastScrolledRef = useRef<number>(scrolled);
  const router = useRouter();
  const route = router.pathname;

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

  const checkActive = (path: string) => {
    const activeState = "font-bold !text-[#729172]";

    if (path === "/") {
      return route == path ? activeState : "";
    } else if (path.includes("[country]")) {
      return path.includes(window.location.pathname) ? activeState : "";
    } else {
      return route.includes(path) ? activeState : "";
    }
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
      className={`z-[99] ${
        scrolled > 250 && scrolledUp && "!fixed top-0 inset-x-0 h-[4.5rem]"
      } ${
        screenSize < 1000
          ? `fixed h-[100dvh] before:fixed before:w-[200vw] before:bg-[#707070] before:opacity-75 ${
              navOpen
                ? "left-0 before:inset-0 animate-[menuFadeIn_0.5s_ease-out_forwards] !block"
                : "-left-[100vw]"
            }`
          : screenSize > 1500 && "relative max-w-[1400px] mx-auto"
      }`}
    >
      <Link
        className={`absolute z-[99] ${
          screenSize < 1000
            ? `left-6 hidden bg-primary py-4 pr-10 ${navOpen && "!block"}`
            : `top-4 ${scrolled > 250 && scrolledUp && "!absolute !top-3.5"} ${
                screenSize < 1250
                  ? "left-[9vw]"
                  : screenSize <= 1600
                  ? "left-[10vw]"
                  : "left-[140px]"
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
              : textColor === "black"
              ? LogoMainBlack
              : LogoPrimary
          }
          alt="Logo Reisfeeld Wit"
        />
      </Link>

      <CloseButton
        className={`absolute top-6 right-4 cursor-pointer z-[99] text-black ${
          screenSize >= 1000 && "hidden"
        } ${navOpen && "animate-[menuFadeIn_0.5s_ease-out_forwards]"}`}
        closeMenu={() => setNavOpen(false)}
      />

      <ul
        className={`${
          screenSize < 1000
            ? `w-[90vw] max-w-[400px] h-full rounded-r-3xl bg-primary pl-6 pr-4 pt-32 pb-14 [&>li:not(:last-of-type)]:mb-6 [&>li:last-of-type]:mb-12 hidden overflow-y-scroll 
            ${navOpen && "animate-[menuFadeIn_0.5s_ease-out_forwards] !block"}`
            : `flex before:top-0 before:inset-x-0 before:h-[4.5rem] before:z-[-1] [&_a:hover]:text-[#729172] [&_a:focus]:text-[#729172] ${
                scrolled > 250 && scrolledUp
                  ? `absolute before:fixed top-[22px] before:bg-primary before:shadow-subtle`
                  : `absolute before:absolute top-7 ${
                      textColor === "primary" && "text-primary"
                    }`
              } ${
                screenSize < 1250
                  ? "right-[9vw] [&>li:not(:last-child)]:mr-6 [&>div]:mr-4"
                  : `[&>li:not(:last-child)]:mr-10 [&>div]:mr-8 ${
                      screenSize <= 1600 ? "right-[10vw]" : "right-[140px]"
                    }`
              }`
        } text-black text-xl [&>li]:font-bold`}
      >
        <li>
          <Link className={checkActive("/")} href="/">
            Home
          </Link>
        </li>

        <li>
          <MenuDropdown
            checkActive={checkActive}
            items={{
              title: "Bestemmingen",
              href: "/bestemmingen",
              boxContent: {
                title: "Inspriratie voor jouw volgende reis",
                paragraph:
                  "Alle reistips zijn geschreven vanuit onze eigen ervaringen. Hiermee hopen wij jou te helpen bij het plannen van je volgende reis met de leukste activiteiten, lekkere restaurantjes en handige weetjes!",
              },
              children: {
                Azië: [
                  {
                    title: "Indonesië",
                    route: "/bestemmingen/indonesie",
                  },
                  {
                    title: "Sri Lanka",
                    route: "/bestemmingen/sri-lanka",
                  },
                ],
              },
            }}
          />
        </li>

        <li>
          <Link className={checkActive("/accommodaties")} href="/accommodaties">
            Accommodaties
          </Link>
        </li>
        <li>
          <Link className={checkActive("/over-ons")} href="/over-ons">
            Over ons
          </Link>
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
