import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Stack,
  Grid,
  Skeleton,
  Divider,
  Fade,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import { useForm, Controller } from "react-hook-form";
import { useClaims } from "../hooks/useClaims";

interface ClaimFormInputs {
  fullName: string;
  policyNumber: string;
  email: string;
  phone: string;
  billNumber: string;
  incidentDate: string;
  claimType: string;
  claimAmount: string;
  description: string;
  documents: FileList | null;
  documentBase64?: string;
}

const ClaimForm = () => {
  const { handleSubmit, control, reset, setValue } = useForm<ClaimFormInputs>();
  const { addClaim } = useClaims();
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const apiKey =
    "bhagatayush8818@gmail.com_3b6XzAS4OjH0xBRXJawj6cOVJ9HvvoqNQW1HVMPH7SPWovqnZ973DpfIOiCvuifV";

  // ✅ Convert and Parse PDF logic (unchanged for brevity)
  const uploadToPDFco = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch("https://api.pdf.co/v1/file/upload", {
      method: "POST",
      headers: { "x-api-key": apiKey },
      body: formData,
    });
    const result = await response.json();
    if (result.error) throw new Error(result.message);
    return result.url;
  };

  const parsePDF = async (fileUrl: string): Promise<string> => {
    const response = await fetch("https://api.pdf.co/v1/pdf/convert/to/text", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify({
        url: fileUrl,
        inline: true,
      }),
    });

    const result = await response.json();
    if (result.error) throw new Error(result.message);

    if (result.body) return result.body;
    if (result.url) {
      const textResponse = await fetch(result.url);
      return await textResponse.text();
    }
    throw new Error("No text returned from PDF.co");
  };

  // ✅ Handle file upload
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    setUploadedFiles([file]);
    setIsUploading(true);

    try {
      const fileUrl = await uploadToPDFco(file);
      const text = await parsePDF(fileUrl);

const fullName = text.match(/(?<!E)Name[:\s]+([A-Za-z\s]+?)(?=\r?\n|Policy|Email|Phone|$)/i)?.[1];
      const policyNumber = text.match(/Policy\s*Number[:\s]+([A-Z0-9-]+)/i)?.[1];
      const claimAmount = text.match(/Claim\s*Amount[:\s]+\$?([\d,]+)/i)?.[1];
      const billNumber = text.match(/Bill\s*(?:No|Number)[:\s]+([A-Z0-9-]+)/i)?.[1];
      const incidentDate = text.match(/Incident\s*Date[:\s]+([\d/.-]+)/i)?.[1];
      const email = text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)?.[0];
      const phone = text.match(/\+?\d[\d\s-]{8,}\d/i)?.[0];

      if (fullName) setValue("fullName", fullName.trim());
      if (policyNumber) setValue("policyNumber", policyNumber.trim());
      if (claimAmount) setValue("claimAmount", claimAmount.trim());
      if (billNumber) setValue("billNumber", billNumber.trim());
      if (incidentDate) setValue("incidentDate", incidentDate.trim());
      if (email) setValue("email", email.trim());
      if (phone) setValue("phone", phone.trim());
    } catch (err) {
      console.error("❌ Error:", err);
      alert("Failed to extract text from PDF.");
    }

    setIsUploading(false);
  };

  // ✅ Submit handler
  const onSubmit = async (data: ClaimFormInputs) => {
    addClaim(data);
    alert("✅ Claim submitted successfully!");
    reset();
    setUploadedFiles([]);
  };

  return (
    <Fade in timeout={800}>
      <Box
        sx={{
          background: "linear-gradient(to bottom right, #E8F0FF, #F7FAFF)",
          minHeight: "100vh",
          py: 6,
        }}
      >
        {/* Hero Header */}
        <Stack alignItems="center" mb={4}>
          <DescriptionOutlinedIcon sx={{ fontSize: 50, color: "#1976d2" }} />
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{
              background: "linear-gradient(to right, #007BFF, #00BFFF)",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Insurance Claim Submission
          </Typography>
          <Typography color="text.secondary" fontSize={15}>
            Submit your claim easily by uploading your supporting document
          </Typography>
        </Stack>

        <Paper
          elevation={5}
          sx={{
            maxWidth: 900,
            mx: "auto",
            p: 5,
            borderRadius: 4,
            backgroundColor: "#fff",
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              {/* Section 1 */}
              <Grid item xs={12}>
                <Typography variant="h6" fontWeight="600" color="#007BFF" mb={1}>
                  Personal Information
                </Typography>
                <Divider sx={{ mb: 2 }} />
              </Grid>

              {[
                ["fullName", "Full Name"],
                ["email", "Email"],
                ["phone", "Phone"],
              ].map(([name, label]) => (
                <Grid item xs={12} sm={4} key={name}>
                  {isUploading ? (
                    <Skeleton variant="rounded" height={56} animation="wave" />
                  ) : (
                    <Controller
                      name={name as keyof ClaimFormInputs}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label={label}
                          required
                          variant="outlined"
                          size="medium"
                        />
                      )}
                    />
                  )}
                </Grid>
              ))}

              {/* Section 2 */}
              <Grid item xs={12}>
                <Typography variant="h6" fontWeight="600" color="#007BFF" mt={2}>
                  Claim Details
                </Typography>
                <Divider sx={{ mb: 2 }} />
              </Grid>

              {[
                ["policyNumber", "Policy Number"],
                ["billNumber", "Bill Number"],
                ["incidentDate", "Incident Date"],
                ["claimType", "Claim Type"],
                ["claimAmount", "Claim Amount ($)"],
              ].map(([name, label]) => (
                <Grid item xs={12} sm={6} key={name}>
                  {isUploading ? (
                    <Skeleton variant="rounded" height={56} animation="wave" />
                  ) : (
                    <Controller
                      name={name as keyof ClaimFormInputs}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label={label}
                          required
                          type={name === "incidentDate" ? "date" : "text"}
                          InputLabelProps={
                            name === "incidentDate"
                              ? { shrink: true }
                              : undefined
                          }
                        />
                      )}
                    />
                  )}
                </Grid>
              ))}

              {/* Description */}
              <Grid item xs={12}>
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      multiline
                      rows={4}
                      label="Description"
                      placeholder="Briefly describe your claim..."
                      variant="outlined"
                      required
                    />
                  )}
                />
              </Grid>

              {/* File Upload */}
              <Grid item xs={12}>
                <Box
                  sx={{
                    border: "2px dashed #90caf9",
                    borderRadius: 3,
                    textAlign: "center",
                    p: 4,
                    backgroundColor: "#f9fbff",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: "#f1f6ff",
                      borderColor: "#007BFF",
                    },
                  }}
                >
                  <input
                    type="file"
                    id="file-upload"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    style={{ display: "none" }}
                  />
                  <label htmlFor="file-upload" style={{ cursor: "pointer" }}>
                    <CloudUploadIcon
                      sx={{ fontSize: 48, color: "#1976d2" }}
                    />
                    <Typography variant="body1" mt={1}>
                      Click to upload or drag and drop (PDF/DOCX)
                    </Typography>
                  </label>

                  {isUploading && (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      mt={2}
                      fontStyle="italic"
                    >
                      Uploading and extracting text...
                    </Typography>
                  )}

                  {uploadedFiles.length > 0 && (
                    <Stack spacing={1} mt={2} alignItems="center">
                      {uploadedFiles.map((file, idx) => (
                        <Typography
                          key={idx}
                          variant="body2"
                          color="text.secondary"
                        >
                          📄 {file.name}
                        </Typography>
                      ))}
                    </Stack>
                  )}
                </Box>
              </Grid>

              {/* Submit Button */}
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={isUploading}
                  sx={{
                    mt: 3,
                    py: 1.4,
                    borderRadius: 2,
                    textTransform: "none",
                    fontWeight: "bold",
                    fontSize: "1.1rem",
                    background: "linear-gradient(to right, #007BFF, #00BFFF)",
                    boxShadow: "0px 4px 14px rgba(0, 123, 255, 0.3)",
                    "&:hover": {
                      background: "linear-gradient(to right, #0062cc, #0096FF)",
                    },
                  }}
                >
                  {isUploading ? "Processing..." : "Submit Claim"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
    </Fade>
  );
};

export default ClaimForm;
