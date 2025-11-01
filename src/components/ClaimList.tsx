import React from "react";
import { Box, Typography, Fade } from "@mui/material";
import { useClaims } from "../hooks/useClaims";
import ClaimStatusCard from "./ClaimStatusCard";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";

const ClaimList = () => {
  const { claims } = useClaims();

  if (claims.length === 0) {
    return (
      <Fade in timeout={700}>
        <Box textAlign="center" mt={10}>
          <DescriptionOutlinedIcon
            sx={{ fontSize: 60, color: "text.disabled", mb: 2 }}
          />
          <Typography variant="h6" color="text.secondary">
            No claims submitted yet.
          </Typography>
        </Box>
      </Fade>
    );
  }

  return (
    <Fade in timeout={700}>
      <Box
        maxWidth={900}
        mx="auto"
        mt={5}
        sx={{
          backgroundColor: "#f7faff",
          borderRadius: 3,
          p: 4,
          boxShadow: "0px 4px 20px rgba(0,0,0,0.05)",
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          mb={3}
          sx={{
            background: "linear-gradient(to right, #007BFF, #00BFFF)",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Your Claims
        </Typography>

        {claims.map((claim) => (
          <ClaimStatusCard key={claim.id} claim={claim} />
        ))}
      </Box>
    </Fade>
  );
};

export default ClaimList;
