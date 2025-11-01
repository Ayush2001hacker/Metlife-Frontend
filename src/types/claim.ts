export interface Claim {
  id: string;
  fullName: string;
  policyNumber: string;
  claimType: string;
  description: string;
  status: "Pending" | "In Review" | "Approved" | "Rejected";
  createdAt: string;
}
