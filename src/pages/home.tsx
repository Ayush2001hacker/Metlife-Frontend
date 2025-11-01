import React from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";


const Home: React.FC = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage:
            'url("https://emerj.com/wp-content/uploads/2023/04/002-AI-at-MetLife-min.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          py: { xs: 10, md: 14 },
          color: "white",
          textAlign: "center",
        }}
      >
        {/* <Container maxWidth="md">
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 700,
              mb: 2,
              fontSize: { xs: "2rem", md: "3rem" },
              textShadow: "0px 2px 8px rgba(0,0,0,0.4)",
            }}
          >
            Welcome to MetLife Claim Portal
          </Typography>
          <Typography
            variant="h5"
            sx={{
              mb: 4,
              fontSize: { xs: "1.1rem", md: "1.4rem" },
              textShadow: "0px 1px 6px rgba(0,0,0,0.3)",
            }}
          >
            Submit and track your insurance claims quickly, securely, and
            transparently.
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              backgroundColor: "#0071bb",
              "&:hover": { backgroundColor: "#005b9e" },
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            Get Started
          </Button>
        </Container> */}
      </Box>

      {/* Info / Cards Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                height: "100%",
                textAlign: "center",
                boxShadow: 3,
                borderRadius: 3,
                transition: "0.3s",
                "&:hover": { transform: "translateY(-6px)" },
              }}
            >
              <Box
                component="img"
                src="https://bpo.click-vision.com/wp-content/uploads/2024/05/Detail-of-the-claim-form.jpg"
                alt="Submit Claim"
                sx={{
                  height: 180,
                  width: "100%",
                  objectFit: "cover",
                  borderTopLeftRadius: 12,
                  borderTopRightRadius: 12,
                }}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom >
                  Submit a Claim
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  File your claim in just a few minutes — no paperwork, no
                  hassle.
                </Typography>
                <Button
                  size="small"
                  variant="outlined"
                  sx={{ textTransform: "none", borderColor: "#0071bb", color: "#0071bb" }}
                  component={Link} to="/submit-claim"
                >
                  Start Now
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card
              sx={{
                height: "100%",
                textAlign: "center",
                boxShadow: 3,
                borderRadius: 3,
                transition: "0.3s",
                "&:hover": { transform: "translateY(-6px)" },
              }}
            >
              <Box
                component="img"
                src="https://assets.visitorscoverage.com/production/images/track-travel-medical-insurance-claims-status-header.jpeg?width=872"
                alt="Track Claim"
                sx={{
                  height: 180,
                  width: "100%",
                  objectFit: "cover",
                  borderTopLeftRadius: 12,
                  borderTopRightRadius: 12,
                }}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Track Your Claim
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  Stay updated with real-time claim tracking and status alerts.
                </Typography>
                <Button
                  size="small"
                  variant="outlined"
                  sx={{ textTransform: "none", borderColor: "#0071bb", color: "#0071bb" }}
                  component={Link} to="/track-claims"
                >
                  View Status
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card
              sx={{
                height: "100%",
                textAlign: "center",
                boxShadow: 3,
                borderRadius: 3,
                transition: "0.3s",
                "&:hover": { transform: "translateY(-6px)" },
              }}
            >
              <Box
                component="img"
                src="https://img.freepik.com/free-vector/flat-design-illustration-customer-support_23-2148887720.jpg?semt=ais_hybrid&w=740&q=80"
                alt="Customer Support"
                sx={{
                  height: 180,
                  width: "100%",
                  objectFit: "cover",
                  borderTopLeftRadius: 12,
                  borderTopRightRadius: 12,
                }}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Contact Support
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  Need help? Our 24×7 support team is ready to assist you.
                </Typography>
                <Button
                    size="small"
                    variant="outlined"
                    sx={{ textTransform: "none", borderColor: "#0071bb", color: "#0071bb" }}
                    component="a"
                    href="https://www.metlife.com/support-and-manage/contact-us/"
                    target="_blank"          
                    rel="noopener noreferrer" 
                    >
                    Get Help
                    </Button>

              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Footer */}
      <Box
        sx={{
          backgroundColor: "#f2f2f2",
          py: 6,
          textAlign: "center",
          borderTop: "1px solid #ddd",
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="body2" color="textSecondary">
            © {new Date().getFullYear()} MetLife Claim Portal. All rights
            reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
