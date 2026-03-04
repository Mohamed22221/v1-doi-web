"use client";

import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import type { FileRejection } from "react-dropzone";

import { uploadFiles } from "@lib/api/upload-files";
import type { FileItem, FileUploadBaseProps } from "./file-upload-types";

interface UseDropzoneUploadOptions extends FileUploadBaseProps {
  /** Auto-upload immediately on file drop */
  autoUpload?: boolean;
}

interface UseDropzoneUploadReturn {
  files: FileItem[];
  isDragActive: boolean;
  isUploading: boolean;
  getRootProps: ReturnType<typeof useDropzone>["getRootProps"];
  getInputProps: ReturnType<typeof useDropzone>["getInputProps"];
  open: ReturnType<typeof useDropzone>["open"];
  removeFile: (id: string) => void;
  uploadAll: () => Promise<void>;
  clearAll: () => void;
}

/**
 * useDropzoneUpload
 *
 * Base hook that integrates react-dropzone with the file upload API.
 * Handles: preview URL creation/revocation, per-file progress, upload state.
 */
export function useDropzoneUpload({
  uploadType,
  fileType = "image",
  maxFiles = 1,
  maxSize = 5,
  accept,
  onUploadSuccess,
  onUploadError,
  autoUpload = false,
}: UseDropzoneUploadOptions): UseDropzoneUploadReturn {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  // Revoke object URLs when component unmounts
  useEffect(() => {
    return () => {
      files.forEach((f) => URL.revokeObjectURL(f.previewUrl));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only on unmount
  }, []);

  const uploadItems = useCallback(
    async (items: FileItem[]) => {
      setIsUploading(true);

      const results: string[] = [];
      const errors: string[] = [];

      for (const item of items) {
        try {
          const response = await uploadFiles({
            uploadType,
            fileType,
            files: [item.file],
            onProgress: (progress) => {
              setFiles((prev) => prev.map((f) => (f.id === item.id ? { ...f, progress } : f)));
            },
          });

          const url = response.urls[0] ?? "";
          results.push(url);
          setFiles((prev) =>
            prev.map((f) => (f.id === item.id ? { ...f, progress: 100, uploadedUrl: url } : f)),
          );
        } catch (err) {
          const message = err instanceof Error ? err.message : "حدث خطأ أثناء الرفع.";
          errors.push(message);
          setFiles((prev) =>
            prev.map((f) => (f.id === item.id ? { ...f, progress: -1, error: message } : f)),
          );
        }
      }

      setIsUploading(false);

      if (errors.length > 0) {
        onUploadError?.(errors.join(", "));
      } else {
        onUploadSuccess?.(results);
      }
    },
    [uploadType, fileType, onUploadError, onUploadSuccess],
  );

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      if (rejectedFiles.length > 0) {
        const firstCode = rejectedFiles[0]?.errors[0]?.code;
        let errorMsg = "فشل رفع الملف.";
        if (firstCode === "file-too-large") errorMsg = "حجم الملف أكبر من الحد المسموح.";
        if (firstCode === "file-invalid-type") errorMsg = "نوع الملف غير مدعوم.";
        if (firstCode === "too-many-files") errorMsg = "تجاوزت الحد الأقصى لعدد الملفات.";

        console.warn("Dropzone rejection:", rejectedFiles);
        onUploadError?.(errorMsg);

        // If some were accepted despite others being rejected, we still process them
        if (acceptedFiles.length === 0) return;
      }

      const slotsAvailable = maxFiles - files.length;
      if (slotsAvailable <= 0) return;

      const toAdd = acceptedFiles.slice(0, slotsAvailable);

      const newItems: FileItem[] = toAdd.map((file) => ({
        id: `${file.name}-${Date.now()}-${Math.random()}`,
        file,
        previewUrl: URL.createObjectURL(file),
        progress: 0,
      }));

      setFiles((prev) => [...prev, ...newItems]);

      if (autoUpload && newItems.length > 0) {
        void uploadItems(newItems);
      }
    },
    [files.length, maxFiles, autoUpload, uploadItems, onUploadError],
  );

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    maxFiles: maxFiles - files.length,
    maxSize: maxSize * 1024 * 1024,
    accept,
    disabled: files.length >= maxFiles,
    multiple: maxFiles > 1,
    noClick: true, // We will trigger click manually via open()
    noKeyboard: true,
  });

  const removeFile = useCallback((id: string) => {
    setFiles((prev) => {
      const target = prev.find((f) => f.id === id);
      if (target) URL.revokeObjectURL(target.previewUrl);
      return prev.filter((f) => f.id !== id);
    });
  }, []);

  const clearAll = useCallback(() => {
    setFiles((prev) => {
      prev.forEach((f) => URL.revokeObjectURL(f.previewUrl));
      return [];
    });
  }, []);

  const uploadAll = useCallback(async () => {
    const pending = files.filter((f) => !f.uploadedUrl && f.progress !== -1);
    if (pending.length === 0) return;
    await uploadItems(pending);
  }, [files, uploadItems]);

  return {
    files,
    isDragActive,
    isUploading,
    getRootProps,
    getInputProps,
    open,
    removeFile,
    uploadAll,
    clearAll,
  };
}
