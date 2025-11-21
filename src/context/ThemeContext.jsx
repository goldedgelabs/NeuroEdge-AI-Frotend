import React from "react";
import { useTheme } from "../../context/ThemeContext";
import { Sun, Moon, Monitor } from "lucide-react";
import "./AnimatedThemeToggle.css";

export default function AnimatedThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  const getIcon = () => {
    if (theme === "light") return <Sun className="icon sun" />;
    if (theme === "dark") return <Moon className="icon moon" />;
    return <Monitor className="icon system" />;
  };

  return (
    <div className="theme-toggle-container" onClick={toggleTheme}>
      <div
        className={`toggle-track ${theme}`}
      >
        <div className={`toggle-thumb ${theme}`}>
          {getIcon()}
        </div>
      </div>
    </div>
  );
}
