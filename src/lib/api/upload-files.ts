"use client";

import { useLocaleStore } from "@store/locale-store";
import { getDirection } from "@lib/i18n/config";

export type UploadType = "product" | "category" | "user_profile" | "seller_document";
export type UploadFileType = "image" | "file";

export interface UploadResponse {
  urls: string[];
}

export interface UploadFilesOptions {
  uploadType: UploadType;
  fileType?: UploadFileType;
  files: File[];
  onProgress?: (progress: number) => void;
}

/**
 * uploadFiles
 *
 * Client-side file upload utility that sends files to the storage endpoint.
 * Uses XMLHttpRequest to support upload progress tracking.
 */
export function uploadFiles({
  uploadType,
  fileType = "image",
  files,
  onProgress,
}: UploadFilesOptions): Promise<UploadResponse> {
  return new Promise((resolve, reject) => {
    const locale = useLocaleStore.getState().locale;
    const direction = getDirection(locale);

    const formData = new FormData();
    formData.append("type", uploadType);
    formData.append("fileType", fileType);
    files.forEach((file) => formData.append("files", file));

    const xhr = new XMLHttpRequest();

    xhr.upload.addEventListener("progress", (event) => {
      if (event.lengthComputable && onProgress) {
        const percent = Math.round((event.loaded / event.total) * 100);
        onProgress(percent);
      }
    });

    xhr.addEventListener("load", () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const response = JSON.parse(xhr.responseText) as UploadResponse;
          resolve(response);
        } catch {
          reject(new Error("Invalid server response"));
        }
      } else {
        reject(new Error(`Upload failed: ${xhr.status} ${xhr.statusText}`));
      }
    });

    xhr.addEventListener("error", () => {
      reject(new Error("Network error during upload"));
    });

    xhr.addEventListener("abort", () => {
      reject(new Error("Upload aborted"));
    });

    xhr.open("POST", "/api/v1/storage/uploads");
    xhr.setRequestHeader("Accept-Language", locale);
    xhr.setRequestHeader("X-Locale", locale);
    xhr.setRequestHeader("X-Dir", direction);
    xhr.send(formData);
  });
}
