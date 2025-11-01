import { useState } from "react";

export interface Claim {
  billNumber: string;
  id: string;
  fullName: string;
  policyNumber: string;
  email: string;
  phone: string;
  claimAmount: string;
  description: string;
  claimType: string;
  status: "Submitted" | "In Review" | "Approved" | "Settled";
  createdAt: string;
}

export const useClaims = () => {
  const [claims, setClaims] = useState<Claim[]>([
    {
      id: "1",
      fullName: "Ayush Bhagat",
      policyNumber: "PL12345",
      email: "ayush@example.com",
      phone: "9876543210",
      claimAmount: "5000",
      description: "Health insurance claim for hospitalization",
      claimType: "Health",
      status: "In Review",
      createdAt: "2025-10-25",
      billNumber:"1234567890"
    },
    {
      id: "2",
      fullName: "Tony Stark",
      policyNumber: "PL67890",
      email: "starkindustries@example.com",
      phone: "9123456789",
      claimAmount: "10000",
      description: "Suit damage claim for fire damage",
      claimType: "Auto",
      status: "Approved",
      createdAt: "2025-10-28",
            billNumber:"1234567890"

    },
  ]);

  const addClaim = (claim: Omit<Claim, "id" | "status" | "createdAt">) => {
    const newClaim: Claim = {
      ...claim,
      id: Date.now().toString(),
      status: "Submitted",
      createdAt: new Date().toISOString(),
    };
    setClaims((prev) => [...prev, newClaim]);
  };

  return { claims, addClaim };
};
