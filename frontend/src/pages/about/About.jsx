import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

const aboutTabs = [
  { label: "About Us", path: "/about-us" },
  { label: "Markets", path: "/about-us/markets" },
  { label: "Management", path: "/about-us/management" },
  { label: "Career", path: "/about-us/career" },
];

const About = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const currentTab = aboutTabs.findIndex((tab) =>
    tab.path === "/about-us"
      ? location.pathname === "/about-us"
      : location.pathname.startsWith(tab.path)
  );

  const handleTabChange = (event, newValue) => {
    navigate(aboutTabs[newValue].path);
  };

  return (
    <div
      className="about-page"
      style={{
        padding: 24,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 900,
          bgcolor: " #7925d3",
          borderRadius: 2,
          mb: 3,
          px: 2,
        }}
      >
        <Tabs
          value={currentTab === -1 ? false : currentTab}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{
            "& .MuiTabs-indicator": {
              backgroundColor: " #ea00ff",
              height: 4,
            },
            "& .MuiTab-root": {
              color: "#fff",
              fontWeight: 600,
              fontSize: 20,
              textTransform: "none",
            },
            "& .MuiTab-root.Mui-selected": {
              color: " #ea00ff",
            },
          }}
        >
          {aboutTabs.map((tab, idx) => (
            <Tab key={tab.path} label={tab.label} value={idx} />
          ))}
        </Tabs>
      </Box>
      <Outlet />
    </div>
  );
};

export default About;
