import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Chip,
  Divider,
  Fade,
} from "@mui/material";
import { Claim } from "../hooks/useClaims";

const steps = ["Submitted", "In Review", "Approved", "Settled"];

const statusColors: Record<string, string> = {
  Submitted: "#2196f3",
  "In Review": "#ff9800",
  Approved: "#4caf50",
  Settled: "#2e7d32",
};

const ClaimStatusCard = ({ claim }: { claim: Claim }) => {
  const activeStep = steps.indexOf(claim.status);

  return (
    <Fade in timeout={600}>
      <Card
        sx={{
          mb: 3,
          borderRadius: 3,
          boxShadow: "0px 4px 16px rgba(0,0,0,0.1)",
          overflow: "hidden",
          transition: "transform 0.3s ease",
          "&:hover": { transform: "translateY(-4px)" },
        }}
      >
        {/* Header */}
        <Box
          sx={{
            background: "linear-gradient(to right, #007BFF, #00BFFF)",
            color: "#fff",
            py: 1.5,
            px: 3,
          }}
        >
          <Typography variant="h6" fontWeight="600">
            {claim.claimType} Claim - {claim.policyNumber}
          </Typography>
          <Typography variant="body2" color="rgba(255,255,255,0.8)">
            Submitted on: {new Date(claim.createdAt).toLocaleDateString()}
          </Typography>
        </Box>

        <CardContent sx={{ p: 3 }}>
          {/* Progress Bar */}
          <Stepper
            activeStep={activeStep}
            alternativeLabel
            sx={{
              "& .MuiStepIcon-root.Mui-active": { color: "#007BFF" },
              "& .MuiStepIcon-root.Mui-completed": { color: "#4caf50" },
            }}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Divider sx={{ my: 2 }} />

          {/* Claim Details */}
          <Box>
            <Typography variant="body1" mb={1}>
              <strong>Claim Amount:</strong>{" "}
              <span style={{ color: "#1976d2", fontWeight: 500 }}>
                ${claim.claimAmount}
              </span>
            </Typography>

            <Typography variant="body1" mb={1}>
              <strong>Description:</strong> {claim.description || "—"}
            </Typography>

            <Typography variant="body1" mb={2}>
              <strong>Bill Number:</strong> {claim.billNumber || "—"}
            </Typography>

            <Chip
              label={claim.status}
              sx={{
                backgroundColor: statusColors[claim.status] || "#90caf9",
                color: "#fff",
                fontWeight: "bold",
                mt: 1,
                px: 1,
              }}
            />
          </Box>
        </CardContent>
      </Card>
    </Fade>
  );
};

export default ClaimStatusCard;
