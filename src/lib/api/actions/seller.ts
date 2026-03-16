"use server";

import { apiClient } from "@api/api";
import { API_ENDPOINTS } from "@api/constants";
import { serverActionWrapper } from "../action-utils";
import type {
  TVerifySellerPayload,
  TVerifySellerResponse,
  TGetSellerVerificationResponse,
} from "../types/seller";
import type { ActionState } from "../types/api";

/**
 * verifySellerAction
 *
 * Server Action to handle seller verification submission.
 * Uses FormData to handle text fields and file uploads.
 */
export async function verifySellerAction(
  payload: TVerifySellerPayload,
): Promise<ActionState<TVerifySellerResponse>> {
  return serverActionWrapper(async () => {
    // Construct the JSON payload based on the role
    const jsonPayload: TVerifySellerPayload = {
      role: payload.role,
      types: payload.types,
      notes: payload.notes,
      documents: payload.documents,
    };

    if (payload.role === "Individual Seller") {
      jsonPayload.nationalIdNumber = payload.nationalIdNumber;
    } else {
      jsonPayload.businessName = payload.businessName;
      jsonPayload.businessPhone = payload.businessPhone;
      jsonPayload.commercialRegistrationNumber = payload.commercialRegistrationNumber;
    }

    const response = await apiClient.post<TVerifySellerResponse>(
      API_ENDPOINTS.SELLER.VERIFY,
      jsonPayload,
    );
    return response.data;
  });
}

/**
 * getSellerVerificationStatusAction
 *
 * Server Action to fetch the current verification status of the seller.
 */
export async function getSellerVerificationStatusAction(): Promise<
  ActionState<TGetSellerVerificationResponse>
> {
  return serverActionWrapper(async () => {
    const response = await apiClient.get<TGetSellerVerificationResponse>(
      API_ENDPOINTS.SELLER.ME_VERIFICATION,
    );
    return response.data;
  });
}
