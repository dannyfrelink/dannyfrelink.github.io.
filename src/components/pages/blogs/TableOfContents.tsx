import React from "react";
import { Link } from "react-scroll";
import H3 from "../../typography/H3";
import { useAppContext } from "../../../config/AppContext";
import Details from "../../general/Details";
import palmTree from "../../../assets/logo/palmtree.svg";
import Image from "next/image";

export interface TableOfContentsProps {
  headers: string[];
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ headers }) => {
  const { screenSize } = useAppContext();
  return (
    <>
      {screenSize < 1000 ? (
        <Details summary="Inhoud">
          <ul
            className={`px-4 pt-2 pb-6 rounded-2xl [&>a:not(:last-child)]:mb-2.5 ${
              screenSize < 550
                ? "min-w-[250px] max-w-[325px]"
                : `min-w-[300px] ${
                    screenSize < 750 ? "max-w-[325px]" : "max-w-[350px]"
                  }`
            }`}
          >
            {headers.map((header, index) => (
              <Link
                className="block"
                to={header.toLowerCase().split(" ").join("-")}
                smooth={true}
                offset={-100}
                duration={500}
                key={index}
              >
                <button className="cursor-pointer hover:!text-primary text-sm flex items-center text-left">
                  <Image
                    width={500}
                    height={500}
                    className={`mr-3 ${screenSize < 1000 ? "w-2.5" : "w-3"}`}
                    src={palmTree}
                    alt="Palm Tree Icon"
                  />
                  <li>{header}</li>
                </button>
              </Link>
            ))}
          </ul>
        </Details>
      ) : (
        <section>
          <H3 className="mb-4" color="black">
            Inhoud
          </H3>

          <ul className="bg-secondary px-5 py-6 text-primary rounded-2xl [&>a:not(:last-child)]:mb-2.5">
            {headers.map((header, index) => (
              <Link
                className="block contentsLink"
                to={header.toLowerCase().split(" ").join("-")}
                smooth={true}
                offset={-100}
                duration={500}
                key={index}
              >
                <button className="flex [&>li]:text-left">
                  <Image
                    width={500}
                    height={500}
                    className="w-3 mr-3 mt-1"
                    src={palmTree}
                    alt="Palm Tree Icon"
                  />
                  <li>{header}</li>
                </button>
              </Link>
            ))}
          </ul>
        </section>
      )}
    </>
  );
};

export default TableOfContents;
