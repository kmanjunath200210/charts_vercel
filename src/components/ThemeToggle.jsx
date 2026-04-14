import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const ThemeToggle = () => {

  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      style={{
        padding: "8px 20px",
        margin: "10px",
        cursor: "pointer"
      }}
    >
      {theme === "light" ? "🌙 Dark Mode" : "☀ Light Mode"}
    </button>
  );
};

export default ThemeToggle;