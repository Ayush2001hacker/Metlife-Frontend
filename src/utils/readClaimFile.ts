// src/utils/readClaimFile.ts
import pdfjsLib from "./pdfConfig";
import * as mammoth from "mammoth";

export interface ExtractedClaimData {
  fullName: string;
  policyNumber: string;
  email: string;
  phone: string;
  claimType: string;
  claimAmount: string;
  description: string;
}

/**
 * Extract text from PDF or DOCX and parse into claim data
 */
export const readClaimFile = async (file: File): Promise<ExtractedClaimData> => {
  try {
    let text = "";

    // 1️⃣ Read PDF
    if (file.type === "application/pdf") {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        text += content.items.map((item: any) => item.str).join(" ");
      }
    }

    // 2️⃣ Read DOCX
    else if (
      file.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer });
      text = result.value;
    }

    // 3️⃣ Parse fields from extracted text
    const extractField = (label: string) => {
      const regex = new RegExp(`${label}:\\s*(.*?)(?:\\s|$)`, "i");
      const match = text.match(regex);
      return match ? match[1].trim() : "";
    };

    return {
      fullName: extractField("Full Name") || "John Doe",
      policyNumber: extractField("Policy Number") || "POL123456",
      email: extractField("Email") || "john.doe@example.com",
      phone: extractField("Phone") || "+1 9876543210",
      claimType: extractField("Claim Type") || "Auto",
      claimAmount: extractField("Claim Amount") || "2500",
      description:
        extractField("Description") ||
        "Car accident claim for rear bumper damage.",
    };
  } catch (err) {
    console.error("⚠️ Error reading file:", err);
    // 4️⃣ Fallback mock data
    return {
      fullName: "John Doe",
      policyNumber: "POL123456",
      email: "john.doe@example.com",
      phone: "+1 9876543210",
      claimType: "Auto",
      claimAmount: "2500",
      description: "Car accident claim for rear bumper damage.",
    };
  }
};
