import { createContext, useContext, useEffect, useState } from "react";

const DarkModeContext = createContext();

export function DarkModeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved === "true"; // Carrega o último valor salvo
  });

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", String(newMode));
  };

// Aplica o tema antes mesmo de renderizar qualquer componente
if (darkMode) {
  document.body.classList.add("dark");
} else {
  document.body.classList.remove("dark");
}

useEffect(() => {
  document.body.classList.toggle("dark", darkMode);
}, [darkMode]);

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export function useTheme() {
  return useContext(DarkModeContext);
}
