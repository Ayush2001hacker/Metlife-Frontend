import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
  Stack,
  useTheme,
} from "@mui/material";
import { Visibility, VisibilityOff, Lock, Person } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({
    mobileNumber: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    const { mobileNumber, password } = credentials;

    // ✅ Hardcoded valid credentials
    const validUser = "7000231599";
    const validPass = "12345";

    if (mobileNumber === validUser && password === validPass) {
      localStorage.setItem("isLoggedIn", "true");
      setError("");
      navigate("/"); // redirect to home
    } else {
      setError("Invalid mobileNumber or password");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
        p: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 5,
          width: 400,
          borderRadius: 4,
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
        }}
      >
        {/* Logo Section */}
        <Box textAlign="center" mb={3}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/MetLife_logo.svg/2560px-MetLife_logo.svg.png"
            alt="Max Life Logo"
            style={{ height: 60, marginBottom: 8 }}
          />
          <Typography variant="h6" color="text.secondary">
            Welcome to Max Life Portal
          </Typography>
        </Box>

        {/* Form Fields */}
        <Stack spacing={3}>
          <TextField
            name="mobileNumber"
            label="Mobile Number"
            fullWidth
            variant="outlined"
            value={credentials.mobileNumber}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person color="action" />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            fullWidth
            variant="outlined"
            value={credentials.password}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock color="action" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {error && (
            <Typography color="error" align="center" variant="body2">
              {error}
            </Typography>
          )}

          <Button
            variant="contained"
            size="large"
            fullWidth
            sx={{
              textTransform: "none",
              fontWeight: 600,
              py: 1.2,
              borderRadius: 3,
              background: "linear-gradient(90deg, #FF6B00, #FF8E00)",
              "&:hover": {
                background: "linear-gradient(90deg, #FF8E00, #FF6B00)",
              },
            }}
            onClick={handleLogin}
          >
            Login
          </Button>

          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            sx={{ mt: 1 }}
          >
            Trouble signing in?{" "}
            <Typography
              component="span"
              color="primary"
              sx={{ cursor: "pointer", fontWeight: 500 }}
            >
              Contact Support
            </Typography>
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
};

export default LoginPage;
