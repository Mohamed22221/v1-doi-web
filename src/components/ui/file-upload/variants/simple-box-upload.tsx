"use client";

import { UploadCloud, X } from "lucide-react";

import { cn } from "@utils/cn";
import { useDropzoneUpload } from "../use-dropzone-upload";
import type { FileUploadBaseProps } from "../file-upload-types";

interface SimpleBoxUploadProps extends FileUploadBaseProps {
  /** Main heading shown in the box */
  title?: string;
  /** Subtext/description shown below the icon */
  description?: string;
}

/**
 * SimpleBoxUpload
 *
 * Classic box dropzone.
 * Uses root dropzone + manual trigger logic for consistency.
 */
export function SimpleBoxUpload({
  title = "اسحب الملفات هنا أو انقر للاختيار",
  description,
  maxFiles = 5,
  maxSize = 10,
  accept,
  uploadType,
  fileType = "file",
  onUploadSuccess,
  onUploadError,
  className,
}: SimpleBoxUploadProps) {
  const {
    files,
    isDragActive,
    isUploading,
    getRootProps,
    getInputProps,
    open,
    removeFile,
    uploadAll,
  } = useDropzoneUpload({
    uploadType,
    fileType,
    maxFiles,
    maxSize,
    accept,
    autoUpload: false,
    onUploadSuccess,
    onUploadError,
  });

  return (
    <section {...getRootProps()} className={cn("flex w-full flex-col gap-3", className)}>
      <input {...getInputProps()} />

      <button
        type="button"
        onClick={open}
        className={cn(
          "flex w-full flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-neutral-200 bg-neutral-50 px-6 py-10 text-center transition-colors",
          "hover:border-primary-300 hover:bg-primary-50/50",
          isDragActive && "border-primary-400 bg-primary-50 shadow-inner",
          isUploading && "cursor-wait opacity-60",
          "dark:border-neutral-700 dark:bg-neutral-800/50",
        )}
      >
        <UploadCloud
          className={cn(
            "h-10 w-10 text-primary-400 transition-transform",
            isDragActive && "scale-110",
          )}
          aria-hidden="true"
        />
        <p className="text-sm font-medium text-neutral-700 dark:text-neutral-200">{title}</p>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          {description || `الحد الأقصى لكل ملف: ${maxSize} ميجابايت`}
        </p>
      </button>

      {/* File List */}
      {files.length > 0 && (
        <ul className="flex flex-col gap-2" aria-label="الملفات المحددة">
          {files.map((item) => (
            <li
              key={item.id}
              className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-white p-3 shadow-sm dark:border-neutral-700 dark:bg-neutral-900"
            >
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(item.id);
                }}
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-neutral-100 hover:bg-red-100"
              >
                <X className="h-4 w-4 text-neutral-500" />
              </button>

              <div className="min-w-0 flex-1 text-end">
                <p className="truncate text-sm font-medium">{item.file.name}</p>
                {item.progress > 0 && item.progress < 100 && (
                  <div className="mt-1 h-1 overflow-hidden rounded-full bg-neutral-100">
                    <div
                      className="h-full bg-primary-400 transition-all"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                )}
                {item.error && <p className="mt-0.5 text-xs text-red-500">{item.error}</p>}
              </div>

              <UploadCloud className="h-5 w-5 shrink-0 text-primary-400" />
            </li>
          ))}
        </ul>
      )}

      {/* Manual Upload Trigger */}
      {files.some((f) => !f.uploadedUrl && f.progress !== -1) && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            void uploadAll();
          }}
          disabled={isUploading}
          className="self-end rounded-xl bg-primary-500 px-6 py-2 text-sm font-bold text-white transition-colors hover:bg-primary-600 disabled:opacity-50"
        >
          {isUploading ? "جارٍ الرفع..." : "رفع الملفات"}
        </button>
      )}
    </section>
  );
}
