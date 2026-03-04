"use client";

import { FileUp, X } from "lucide-react";

import { cn } from "@utils/cn";
import { useDropzoneUpload } from "../use-dropzone-upload";
import type { FileUploadBaseProps } from "../file-upload-types";

interface IdentityUploadProps extends FileUploadBaseProps {
  /** Label inside the bar when empty */
  label?: string;
}

/**
 * IdentityUpload
 *
 * Horizontal pill-style dropzone for single document/image uploads.
 * Logic: single root dropzone + manual picker trigger for reliability.
 */
export function IdentityUpload({
  label = "رفع صورة الهوية",
  maxFiles = 1,
  maxSize = 10,
  accept = {
    "image/*": [".jpg", ".jpeg", ".png", ".webp"],
    "application/pdf": [".pdf"],
  },
  uploadType,
  fileType = "image",
  onUploadSuccess,
  onUploadError,
  className,
}: IdentityUploadProps) {
  const { files, isDragActive, isUploading, getRootProps, getInputProps, open, removeFile } =
    useDropzoneUpload({
      uploadType,
      fileType,
      maxFiles,
      maxSize,
      accept,
      autoUpload: true,
      onUploadSuccess,
      onUploadError,
    });

  const file = files[0];

  return (
    <div {...getRootProps()} className={className}>
      <input {...getInputProps()} />

      {file ? (
        <div
          className={cn(
            "flex items-center justify-between gap-3 rounded-full border border-neutral-200 bg-white px-4 py-3 shadow-sm",
            "dark:border-neutral-700 dark:bg-neutral-900",
          )}
          aria-live="polite"
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              removeFile(file.id);
            }}
            aria-label="إزالة الملف"
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-neutral-100 transition-colors hover:bg-red-100 dark:bg-neutral-800 dark:hover:bg-red-900/50"
          >
            <X className="h-4 w-4 text-neutral-500 dark:text-neutral-400" aria-hidden="true" />
          </button>

          <div className="flex min-w-0 flex-1 flex-col gap-1 text-end">
            <span className="truncate text-sm font-medium text-neutral-800 dark:text-neutral-200">
              {file.file.name}
            </span>
            {file.progress > 0 && file.progress < 100 && (
              <div className="h-1 overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-700">
                <div
                  className="h-full bg-primary-400 transition-all"
                  style={{ width: `${file.progress}%` }}
                />
              </div>
            )}
            {file.error && <span className="text-xs text-red-500">{file.error}</span>}
            {file.progress === 100 && <span className="text-xs text-emerald-500">تم الرفع</span>}
          </div>

          <FileUp className="h-5 w-5 shrink-0 text-primary-400" />
        </div>
      ) : (
        <button
          type="button"
          onClick={open}
          className={cn(
            "flex w-full items-center justify-between gap-3 rounded-full border border-neutral-200 bg-white px-4 py-3 transition-colors",
            "hover:border-primary-300 hover:bg-primary-50/50",
            isDragActive && "border-primary-400 bg-primary-50 shadow-inner",
            isUploading && "cursor-not-allowed opacity-60",
            "dark:border-neutral-700 dark:bg-neutral-900",
          )}
        >
          <FileUp className="h-5 w-5 shrink-0 text-primary-400" />
          <span className="flex-1 text-end text-sm text-neutral-500 dark:text-neutral-400">
            {label}
          </span>
        </button>
      )}
    </div>
  );
}
