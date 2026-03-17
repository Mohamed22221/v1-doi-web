"use server";

import { apiClient } from "@api/api";
import { API_ENDPOINTS } from "@api/constants";
import { cookies } from "next/headers";
import { ENV } from "@/config/env";
import { setAuthCookies, updateAccountStatus } from "../auth-cookies";
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

    // Sync cookies if submission was successful
    if (response.success) {
      const cookieStore = await cookies();
      const accessToken = cookieStore.get(ENV.ACCESS_TOKEN_KEY)?.value;
      const refreshToken = cookieStore.get(ENV.REFRESH_TOKEN_KEY)?.value;

      if (accessToken && refreshToken) {
        // Set specific seller role and pending status
        await setAuthCookies(accessToken, refreshToken, payload.role, "seller-pending");
      }
    }

    return response.data;
  });
}

/**
 * updateAccountStatusAction
 *
 * Surgically update the account_status cookie without refreshing the entire session.
 */
export async function updateAccountStatusAction(
  status: string,
): Promise<ActionState<{ success: boolean }>> {
  return serverActionWrapper(async () => {
    await updateAccountStatus(status);
    return { success: true };
  });
}

/**
 * getSellerVerificationStatusAction
 *
 * Server Action to fetch the current verification status of the seller.
 */
export async function getSellerVerificationStatusAction(): Promise<
  ActionState<TGetSellerVerificationResponse["data"]>
> {
  return serverActionWrapper(async () => {
    const response = await apiClient.get<TGetSellerVerificationResponse["data"]>(
      API_ENDPOINTS.SELLER.ME_VERIFICATION,
    );
    return response.data;
  });
}
