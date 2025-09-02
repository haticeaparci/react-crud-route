import { Outlet, NavLink } from "react-router-dom";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

export default function EventLayout() {
  return (
    <div
      style={{
        padding: 24,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <NavLink
          to="/events"
          style={{
            textDecoration: "none",
          }}
          end
        >
          {({ isActive }) => (
            <Button
              variant={isActive ? "contained" : "outlined"}
              color="secondary"
              sx={{
                fontWeight: 600,
                backgroundColor: isActive ? "#d45827" : undefined,
                color: isActive ? "#222" : undefined,
              }}
            >
              All Events
            </Button>
          )}
        </NavLink>
        <NavLink
          to="/events/new"
          style={{
            textDecoration: "none",
          }}
        >
          {({ isActive }) => (
            <Button
              variant={isActive ? "contained" : "outlined"}
              color="secondary"
              sx={{
                fontWeight: 600,
                backgroundColor: isActive ? "#d45827" : undefined,
                color: isActive ? "#222" : undefined,
              }}
            >
              New Event
            </Button>
          )}
        </NavLink>
      </Stack>
      <Outlet />
    </div>
  );
}
