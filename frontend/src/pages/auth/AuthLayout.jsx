import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div style={{ padding: 40, display: "flex", justifyContent: "center" }}>
      <Outlet />
    </div>
  );
}
