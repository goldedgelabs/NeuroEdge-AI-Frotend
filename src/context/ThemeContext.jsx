import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();
export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "system";
  });

  // Listen for system theme changes (live updates)
  useEffect(() => {
    const system = window.matchMedia("(prefers-color-scheme: dark)");

    const applySystemTheme = () => {
      if (theme === "system") {
        document.documentElement.classList.toggle("dark", system.matches);
        document.documentElement.classList.toggle("light", !system.matches);
      }
    };

    system.addEventListener("change", applySystemTheme);
    applySystemTheme();

    return () => system.removeEventListener("change", applySystemTheme);
  }, [theme]);

  // Apply theme on change
  useEffect(() => {
    const root = document.documentElement;

    // Remove previous classes safely
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      root.classList.add(prefersDark ? "dark" : "light");
    } else {
      root.classList.add(theme);
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  // Cycle between themes
  const toggleTheme = () => {
    setTheme((prev) =>
      prev === "light" ? "dark" : prev === "dark" ? "system" : "light"
    );
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
