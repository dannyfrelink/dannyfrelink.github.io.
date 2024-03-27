import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";

interface AppContextProps {
  screenSize: number;
  navOpen: boolean;
  setNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
  destFilter: string;
  setDestFilter: React.Dispatch<React.SetStateAction<string>>;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

interface AppProps {
  children: JSX.Element;
}

export const AppProvider: React.FC<AppProps> = ({ children }) => {
  const [screenSize, setScreenSize] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 0
  );
  const [navOpen, setNavOpen] = useState<boolean>(false);
  const [destFilter, setDestFilter] = useState<string>("");

  const handleWindowResize = useCallback(() => {
    setScreenSize(window.innerWidth);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [handleWindowResize]);

  const contextValue: AppContextProps = {
    screenSize,
    navOpen,
    setNavOpen,
    destFilter,
    setDestFilter,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
