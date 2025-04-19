import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useAppContext } from "@/config/AppContext";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";

interface MenuDropdownChildrenProps {
  title: string;
  route: string;
}

interface MenuDropdownProps {
  checkActive: (e: string) => void;
  items: {
    title: string;
    href: string;
    boxContent: {
      title: string;
      paragraph: string;
    };
    children: {
      [continent: string]: MenuDropdownChildrenProps[];
    };
  };
}

const MenuDropdown: React.FC<MenuDropdownProps> = ({ checkActive, items }) => {
  const { screenSize } = useAppContext();
  const navElementRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const menuContinents = Object.keys(items.children);

  useEffect(() => {
    if (navElementRef.current && dropdownRef.current) {
      const elementPosition =
        navElementRef.current.getBoundingClientRect().left;
      const windowWidth = window.innerWidth;
      const dropdownOffset =
        screenSize <= 1121
          ? elementPosition - 50 - windowWidth * 0.09
          : elementPosition - (windowWidth - 820) / 2;

      dropdownRef.current.style.left = `-${dropdownOffset}px`;
    }
  }, [screenSize]);

  const toggle = (status: boolean) => {
    setIsOpen(status);
  };

  return (
    <>
      <div
        ref={navElementRef}
        className={`relative ${isOpen && screenSize >= 1000 && "pb-24"}`}
        onMouseLeave={() => screenSize >= 1000 && toggle(false)}
      >
        {screenSize < 1000 ? (
          <button onClick={() => setIsOpen((old) => !old)}>
            {items.title}{" "}
            <KeyboardArrowDownRoundedIcon
              className="!max-h-6 w-fit mb-1"
              fontSize="medium"
              color="inherit"
            />
          </button>
        ) : (
          <Link
            href={items.href}
            onMouseEnter={() => toggle(true)}
            className={`${checkActive(items.href)} ${
              isOpen ? "text-[#729172]" : ""
            }`}
          >
            {items.title}{" "}
            <KeyboardArrowDownRoundedIcon
              className="!max-h-6 w-fit mb-1"
              fontSize="medium"
              color="inherit"
            />
          </Link>
        )}

        {screenSize < 1000 ? (
          <div className={`${isOpen ? "" : "hidden"}`}>
            <Link
              href={items.href}
              className={`underline block w-fit text-sm font-normal mt-2`}
            >
              Alle {items.title.toLowerCase()}
            </Link>

            {menuContinents.map((continent: string) => {
              const menuItems = items.children[continent];

              return (
                <div
                  className="flex flex-col flex-wrap text-base [&>*+*]:mt-1.5 w-fit"
                  key={continent}
                >
                  <h3 className="text-tertair font-bold mt-4">{continent}</h3>

                  {menuItems.map((item: MenuDropdownChildrenProps) => (
                    <Link
                      key={item.route}
                      className="text-black font-medium pl-2"
                      href={item.route}
                      onClick={() => toggle(false)}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              );
            })}
          </div>
        ) : (
          <div
            ref={dropdownRef}
            className={`absolute top-16 text-black font-semibold z-30 w-[calc(100dvw-100px-(9vw*2))] max-w-[820px] min-h-[300px] flex bg-primary shadow-subtle rounded-2xl ${
              isOpen ? "flex" : "hidden"
            }`}
          >
            <div className="w-[30%] bg-secondary text-primary m-6 px-6 pt-7 pb-9 rounded-2xl">
              <h2 className="text-xl">{items.boxContent.title}</h2>
              <p className="text-base font-normal my-3">
                {items.boxContent.paragraph}
              </p>

              <Link
                href={items.href}
                className="underline text-base font-normal hover:!text-background"
              >
                Alle {items.title.toLowerCase()}
              </Link>
            </div>

            <div className="px-6 py-7 [&>*:not(:last-child)]:mb-5 [&>*:not(:last-child)]:mr-16 max-h-[400px] w-fit flex flex-col flex-wrap items-start">
              {menuContinents.map((continent: string) => {
                const menuItems = items.children[continent];

                return (
                  <div
                    className="flex flex-col flex-wrap text-lg [&>*+*]:mt-1.5 w-fit"
                    key={continent}
                  >
                    <h3 className="text-tertair font-bold">{continent}</h3>

                    {menuItems.map((item: MenuDropdownChildrenProps) => (
                      <Link
                        key={item.route}
                        className={`${checkActive(
                          `[country]${item.route}`
                        )} text-black`}
                        href={item.route}
                        onClick={() => toggle(false)}
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MenuDropdown;
