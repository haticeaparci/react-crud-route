import "./themeToggle.css";

export default function ThemeToggle({ theme, toggleTheme }) {
  return (
    <button type="button" className="theme-toggle-btn" onClick={toggleTheme}>
      {theme === "light" ? " 🌙   Dark" : " ☀️   Light"}
    </button>
  );
}
