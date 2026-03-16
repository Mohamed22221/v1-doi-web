export type TSellerRole = "Individual Seller" | "Business Seller";

export interface TVerifySellerPayload {
  role: TSellerRole;
  /** Required for Individual Seller */
  nationalIdNumber?: string;
  /** Required for Business Seller */
  businessName?: string;
  /** Required for Business Seller */
  businessPhone?: string;
  /** Required for Business Seller */
  commercialRegistrationNumber?: string;
  /** Array of document types (e.g., ["national_id"] or ["commercial_certificate", "tax_certificate"]) */
  types: string[];
  /** Array of notes for documents (e.g., ["front_side", "CR_Document"]) */
  notes: string[];
  /** Array of document URLs or File objects */
  documents: (string | File)[];
}

export type TSellerApprovalStatus = "approved" | "rejected" | "pending";

export interface TVerifySellerResponse {
  message: string;
  success: boolean;
  data?: unknown;
}

export interface TGetSellerVerificationResponse {
  status: boolean;
  message: string;
  data: {
    id: string;
    approvalStatus: TSellerApprovalStatus;
  };
}
