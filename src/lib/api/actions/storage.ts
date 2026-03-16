"use server";

import { apiClient } from "@api/api";
import { API_ENDPOINTS } from "@api/constants";
import { serverActionWrapper } from "../action-utils";
import type { TUploadPayload, TUploadResponse } from "../types/storage";
import type { ActionState } from "../types/api";

/**
 * Server action to upload files to the storage service.
 * @param payload - The upload payload containing type, fileType, and files.
 */
export async function uploadFilesAction(
  payload: TUploadPayload,
): Promise<ActionState<TUploadResponse["data"]>> {
  return serverActionWrapper(async () => {
    const formData = new FormData();
    formData.append("type", payload.type);
    formData.append("fileType", payload.fileType);

    // Filter out invalid files and append valid ones
    payload.files.forEach((file) => {
      if (file && file instanceof File) {
        formData.append("files", file);
      }
    });

    const response = await apiClient.post<TUploadResponse["data"]>(
      API_ENDPOINTS.STORAGE.UPLOAD,
      formData,
    );
    return response.data;
  });
}
