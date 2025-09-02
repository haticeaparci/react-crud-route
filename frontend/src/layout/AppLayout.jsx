import { Outlet } from "react-router-dom";
import Footer from "../components/footer/Footer.jsx";
import MuiTabNavbar from "../components/navbar/MuiTabNavbar.jsx";
import ThemeToggle from "../components/navbar/ThemeToggle";
import { useState, useEffect } from "react";
import "../components/navbar/themeToggle.css";

export default function AppLayout() {
  const [theme, setTheme] = useState("light");
  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
  }, [theme]);

  return (
    <div className="app-layout">
      <MuiTabNavbar theme={theme} />
      <div className="theme-toggle">
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      </div>

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
