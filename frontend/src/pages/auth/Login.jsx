import { useState } from "react";
import { useNavigate, Link, useLocation, Form } from "react-router-dom";
import {
  TextField,
  Button,
  Box,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { login, isAuthenticated } from "../../utils/auth";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import "./login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const { from, message } = location.state || {};
  const redirectTo = from?.pathname || "/";

  const [snackOpen, setSnackOpen] = useState(!!message && !isAuthenticated());

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError("Email and password are required");
      setSnackOpen(true);
      return;
    }

    const isLoggedIn = login(email, password);

    if (isLoggedIn) {
      navigate(redirectTo, { replace: true });
    } else {
      setError("Invalid email or password");
      setSnackOpen(true);
    }
  };

  return (
    <div className="login-center-container">
      <div className="login-content-wrapper">
        <LockOutlinedIcon
          sx={{
            fontSize: 64,
            color: "#7c3aed",
            mb: 1,
            bgcolor: "#e0e7ff",
            borderRadius: "50%",
            p: 2,
            boxShadow: 2,
            display: "block",
            mx: "auto",
          }}
        />
        <Typography variant="h4" gutterBottom align="center">
          Login
        </Typography>
        <form className="login-form" onSubmit={handleSubmit}>
          <TextField
            id="login-email"
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              "& .MuiInputLabel-root": {
                color: "#7c3aed",
                fontWeight: "bold",
              },
              "& .MuiInputBase-root": {
                backgroundColor: "#f3e8ff",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#7c3aed",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#5b21b6",
              },
              "& .MuiInputBase-input": {
                color: "#3b0764",
              },
            }}
          />
          <TextField
            id="login-password"
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              "& .MuiInputBase-root": {
                backgroundColor: "#f3e8ff",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#7c3aed",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#5b21b6",
              },
              "& .MuiInputBase-input": {
                color: "#3b0764",
              },
            }}
          />
          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            id="login-btn"
            variant="contained"
            color="secondary"
            fullWidth
            sx={{
              mt: 2,
              bgcolor: "#7c3aed",
              "&:hover": {
                bgcolor: " #5b21b6",
                color: "#d45827",
                fontWeight: "bold",
              },
            }}
          >
            Login
          </Button>
        </form>
        <Typography variant="body2" sx={{ mt: 2 }} align="center">
          Don’t have an account? <Link to="/auth/register">Register</Link>
        </Typography>
        <Snackbar
          open={snackOpen}
          autoHideDuration={6000}
          onClose={() => setSnackOpen(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={() => setSnackOpen(false)}
            severity={error ? "error" : "warning"}
            sx={{ width: "100%" }}
          >
            {error || message}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
}
