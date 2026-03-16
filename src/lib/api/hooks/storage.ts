"use client";

import { useAppMutation } from "../action-utils";
import { uploadFilesAction } from "../actions/storage";
import { getApiErrorMessage } from "@api/error";
import type { TUploadPayload } from "../types/storage";

/**
 * Hook to handle file storage operations (Uploads, etc.)
 */
export function useStorage() {
  const uploadMutation = useAppMutation(uploadFilesAction);

  return {
    uploadFiles: (payload: TUploadPayload) => uploadMutation.mutate(payload),
    uploadFilesAsync: (payload: TUploadPayload) => uploadMutation.mutateAsync(payload),
    isPending: uploadMutation.isPending,
    isError: uploadMutation.isError,
    data: uploadMutation.data,
    errorMessage: uploadMutation.error ? getApiErrorMessage(uploadMutation.error) : null,
  };
}
