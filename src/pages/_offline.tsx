import Button from "@/components/general/Button";
import { useAppContext } from "@/config/AppContext";
import { Footer, ScrollBar, Title } from "@/helpers/dynamicImports";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import LogoBlack from "../assets/logo/Logo-ReisFeeld-main-black.svg";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import Nav from "@/components/header/Nav";

const Offline: React.FC = () => {
  const { setNavOpen, screenSize } = useAppContext();

  return (
    <ScrollBar>
      <div>
        <header>
          <Button
            onClick={() => setNavOpen(true)}
            className={`fixed top-6 z-[98] ${
              screenSize < 750
                ? "right-4 !py-1.5 !px-2.5"
                : `right-10 !py-2 !px-3 ${screenSize >= 1000 && "hidden"}`
            }`}
          >
            <MenuRoundedIcon />
          </Button>

          <Link
            className={`absolute top-5 ${
              screenSize < 750
                ? "left-4"
                : `left-10 ${screenSize >= 1000 && "hidden"}`
            }`}
            href="/"
          >
            <Image
              width={500}
              height={500}
              className={`block !w-auto ${
                screenSize < 750 ? "!h-12" : "!h-[52px]"
              }`}
              src={LogoBlack}
              alt="Logo ReisFeeld Zwart"
            />
          </Link>

          <Nav textColor="black" />

          <Title
            title="Kan deze pagina niet laden"
            subTitle="Momenteel heb je geen internetverbinding. Verbind opnieuw met
          internet om deze pagina te laden, of bezoek eerder bezochte pagina's
          voor offline gebruik."
            align="center"
            size="large"
            isBlog
          />
        </header>

        <Footer />
      </div>
    </ScrollBar>
  );
};

export default Offline;
