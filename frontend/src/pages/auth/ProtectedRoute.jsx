import { useLocation, Navigate } from "react-router-dom";
import { isAuthenticated } from "../../utils/auth";

export default function ProtectedRoute({ children }) {
  const location = useLocation();
  const isAuth = isAuthenticated();

  if (!isAuth) {
    return (
      <Navigate
        to="/auth/login"
        state={{ from: location, message: "Please login to continue" }}
        replace
      />
    );
  }

  return children;
}
