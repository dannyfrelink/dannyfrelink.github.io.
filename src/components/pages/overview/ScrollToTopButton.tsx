import React, { useState, useEffect, useCallback } from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { useAppContext } from "../../../config/AppContext";
import { useRouter } from "next/router";

const ScrollToTopButton: React.FC = () => {
  const router = useRouter();
  const scrollFilter = router.pathname;

  const [isVisible, setIsVisible] = useState(false);
  const { screenSize } = useAppContext();

  const handleScroll = useCallback(() => {
    const scrolled = window.scrollY;
    setIsVisible(
      scrollFilter === "/indonesie"
        ? screenSize < 750
          ? scrolled > 1000
          : screenSize < 1250
          ? scrolled > 1050
          : scrolled > 1100
        : scrollFilter === "/accommodaties"
        ? screenSize < 550
          ? scrolled > 700
          : screenSize < 750
          ? scrolled > 600
          : scrolled > 1100
        : scrolled > 150
    );
  }, [screenSize, scrollFilter]);

  const scrollToTop = () => {
    window.scrollTo({
      top:
        scrollFilter === "/indonesie"
          ? 900
          : scrollFilter === "/accommodaties"
          ? screenSize < 750
            ? 400
            : 750
          : 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <button
      className={`${isVisible ? "flex" : "hidden"} ${
        screenSize < 750
          ? "bottom-6 right-4 w-10 h-10 [&>svg]:text-xl"
          : screenSize < 1250
          ? "bottom-8 right-6 w-12 h-12"
          : "bottom-10 right-8 w-14 h-14 [&>svg]:text-3xl"
      } fixed bg-secondary text-primary shadow-subtle opacity-80 justify-center items-center rounded-full z-[98] cursor-pointer`}
      onClick={scrollToTop}
    >
      <ArrowUpwardIcon />
    </button>
  );
};

export default ScrollToTopButton;
