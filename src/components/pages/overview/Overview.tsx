import React from "react";
import Container from "../../general/Container";
import H2 from "../../typography/H2";
import Button from "../../general/Button";
import { useAppContext } from "../../../config/AppContext";

export interface OverviewProps {
  children: React.ReactNode[];
  destinations: string[];
}

const Overview: React.FC<OverviewProps> = ({ children, destinations }) => {
  const { screenSize, destFilter, setDestFilter } = useAppContext();

  return (
    <main>
      <Container>{children[0]}</Container>

      <section
        className={`relative text-center before:absolute before:inset-x-0 before:-inset-y-6 before:bg-background before:z-[-1] ${
          screenSize < 750 ? "pt-5 pb-7" : "pt-7 pb-10"
        }`}
      >
        <H2>Bestemmingen</H2>

        <div
          className={`flex flex-wrap justify-center w-[85vw] max-w-[800px] mx-auto ${
            screenSize < 750
              ? "mt-4 gap-3"
              : screenSize < 1250
              ? "max-w-[700px] mt-6 gap-y-4 gap-x-7"
              : "mt-8 gap-y-4 gap-x-10"
          }`}
        >
          {destinations.map((dest, index) => (
            <Button
              key={index}
              onClick={() =>
                destFilter == dest ? setDestFilter("") : setDestFilter(dest)
              }
              className={destFilter == dest ? "!bg-secondary" : "!bg-tertair"}
            >
              {dest}
            </Button>
          ))}
        </div>
      </section>

      <Container>{children[1]}</Container>
    </main>
  );
};

export default Overview;
