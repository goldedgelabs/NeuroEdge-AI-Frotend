import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("system");

  // Load saved theme from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) {
      setTheme(saved);
    }
  }, []);

  // Apply theme to <html>
  useEffect(() => {
    const root = document.documentElement;

    const applyTheme = (t) => {
      if (t === "light") {
        root.classList.remove("dark");
      } else if (t === "dark") {
        root.classList.add("dark");
      } else if (t === "system") {
        const systemPrefersDark = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;

        if (systemPrefersDark) root.classList.add("dark");
        else root.classList.remove("dark");
      }
    };

    applyTheme(theme);

    // Save theme
    localStorage.setItem("theme", theme);

    // Watch system changes when in system mode
    if (theme === "system") {
      const watcher = window.matchMedia("(prefers-color-scheme: dark)");
      const handler = () => applyTheme("system");
      watcher.addEventListener("change", handler);
      return () => watcher.removeEventListener("change", handler);
    }
  }, [theme]);

  // Toggle through all three modes
  const toggleTheme = () => {
    setTheme((prev) =>
      prev === "light" ? "dark" : prev === "dark" ? "system" : "light"
    );
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
               }
