import React from "react";
import { AppBar, Toolbar, Typography, Button, Stack, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Box display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/MetLife_logo.svg/2560px-MetLife_logo.svg.png"
            alt="MetLife Logo"
            style={{ height: 40, marginRight: 10 }}
          />
          
        </Box>

        <Stack direction="row" spacing={2}>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/submit-claim">
            Submit Claim
          </Button>
          <Button color="inherit" component={Link} to="/track-claims">
            Track Claims
          </Button>
          <Button color="inherit" component={Link} to="/admin">
            Admin
          </Button>

          {/* ✅ Show Logout only if user is logged in */}
          {isLoggedIn && (
            <Button
              color="secondary"
              variant="outlined"
              onClick={handleLogout}
              sx={{
                ml: 2,
                borderColor: "white",
                color: "white",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.1)",
                  borderColor: "white",
                },
              }}
            >
              Logout
            </Button>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
