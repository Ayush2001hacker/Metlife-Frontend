import React from "react";
import { Box, Typography } from "@mui/material";

const AdminDashboard = () => {
  return (
    <Box textAlign="center" mt={10}>
      <Typography variant="h4">Admin Dashboard</Typography>
      <Typography mt={2}>
        Manage and review submitted claims (coming soon...).
      </Typography>
    </Box>
  );
};

export default AdminDashboard;
