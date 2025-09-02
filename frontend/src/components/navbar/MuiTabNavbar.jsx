import "./muitabnavbar.css";
import React from "react";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Button from "@mui/material/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { isAuthenticated, logout } from "../../utils/auth";
import Logo from "./Logo";

const routes = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about-us" },
  { label: "Events", path: "/events" },
  { label: "Friends", path: "/friends" },
  { label: "Products", path: "/products" },
  { label: "Contact", path: "/contact" },
];

export default function MuiTabNavbar({ theme }) {
  const location = useLocation();
  const navigate = useNavigate();
  const auth = isAuthenticated();

  let currentTab = routes.findIndex((route) =>
    route.path === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(route.path)
  );

  if (location.pathname.startsWith("/auth/login")) {
    currentTab = false;
  }

  const handleLogout = () => {
    logout();
    navigate("/auth/login");
  };

  return (
    <AppBar
      position="static"
      id="main-appbar"
      data-testid="appbar"
      sx={{
        // background: theme === "dark" ? "#18122b" : "#f7eafd",
        background: theme === "dark" ? "#18122b" : "  #e7d8f8",
        color: theme === "dark" ? "#fff" : "#222",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
          padding: "0 16px",
        }}
      >
        <div style={{ justifySelf: "start" }}>
          <Logo size={24} />
        </div>

        <div style={{ justifySelf: "center" }}>
          <Tabs
            id="main-tabs"
            data-testid="main-tabs"
            value={currentTab === -1 ? false : currentTab}
            indicatorColor="secondary"
            textColor="secondary"
            aria-label="navigation tabs"
            sx={{
              "& .MuiTabs-indicator": {
                backgroundColor: "#ea00ff",
              },
              "& .MuiTab-root": {
                color: theme === "dark" ? "#fff" : "#222",
              },
              "& .MuiTab-root.Mui-selected": {
                color: "#ea00ff",
              },
            }}
          >
            {routes.map((route, idx) => (
              <Tab
                key={route.path}
                label={route.label}
                component={Link}
                to={route.path}
                value={idx}
              />
            ))}
          </Tabs>
        </div>

        <div style={{ justifySelf: "end" }}>
          {!auth ? (
            <Button
              component={Link}
              to="/auth/login"
              variant="contained"
              sx={{
                background: " #7c3aed",
                color: "#fff",
                fontWeight: "bold",
                boxShadow: "none",
                "&:hover": {
                  background: "#5b21b6",
                  color: "#d45827",
                },
              }}
            >
              Login
            </Button>
          ) : (
            <Button
              onClick={handleLogout}
              variant="contained"
              sx={{
                background: "#f14e03",
                color: "#fff",
                fontWeight: "bold",
                boxShadow: "none",
                "&:hover": {
                  background: "#c13c00",
                },
              }}
            >
              Logout
            </Button>
          )}
        </div>
      </div>
    </AppBar>
  );
}
