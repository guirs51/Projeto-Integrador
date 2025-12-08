import { createContext, useContext, useEffect, useState } from "react";



export const DarkModeContext = createContext(null);

const IS_DARK_KEY = "isDark";

export function DarkModeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem(IS_DARK_KEY);
    return saved === "true"; // localStorage sempre retorna string
  });

  // Atualiza o localStorage quando darkMode muda
  useEffect(() => {
    localStorage.setItem(IS_DARK_KEY, darkMode.toString());
  }, [darkMode]);

  function toggleMode() {
    setDarkMode((prev) => !prev);
  }

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}


import { DarkModeContext } from "./DarkModeContext";

export const useDarkMode = () => {
  return useContext(DarkModeContext);
};