import { FileUp, X } from "lucide-react";

import { cn } from "@utils/cn";
import { useDropzoneUpload } from "../use-dropzone-upload";
import type { FileUploadBaseProps } from "../file-upload-types";

export interface IdentityUploadProps extends FileUploadBaseProps {
  /** Label inside the bar when empty */
  label?: string;
  /** Pass-through value for form state */
  value?: string;
  /** Pass-through onChange for form state */
  onChange?: (value: string) => void;
  /** Whether the component should look focused */
  isFocused?: boolean;
  /** Whether the component is in an error state */
  isInvalid?: boolean;
}

/**
 * IdentityUpload
 *
 * Horizontal pill-style dropzone for single document/image uploads.
 * Logic: single root dropzone + manual picker trigger for reliability.
 */
export function IdentityUpload({
  label: _label,
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
  onChange,
  className,
  isInvalid,
}: IdentityUploadProps) {
  const { files, isDragActive, isUploading, getRootProps, getInputProps, open, removeFile } =
    useDropzoneUpload({
      uploadType,
      fileType,
      maxFiles,
      maxSize,
      accept,
      autoUpload: true,
      onUploadSuccess: (urls: string[]) => {
        const url = urls[0] || "";
        onUploadSuccess?.(urls);
        onChange?.(url);
      },
      onUploadError,
    });

  const file = files[0];

  return (
    <div
      {...getRootProps()}
      className={cn("w-full cursor-pointer transition-all", className)}
      data-active={isDragActive || !!file ? "true" : undefined}
    >
      <input {...getInputProps()} />

      {file ? (
        <div
          className={cn(
            "input flex items-center justify-between gap-3 px-4 py-0",
            !isInvalid && "border-primary-400 shadow-xs ring-2 ring-primary-400/20", // Focused look only if valid
            isInvalid && "border-destructive ring-destructive/20", // Destructive look manually enforced
            "transition-colors hover:bg-primary-50/10",
            "dark:border-neutral-700 dark:hover:bg-primary-900/10",
          )}
          aria-live="polite"
        >
          {/* Invisible spacer to balance the remove button and achieve perfect centering */}
          <div className="h-7 w-7 shrink-0" aria-hidden="true" />

          <div className="flex min-w-0 flex-1 flex-col justify-end gap-0.5 text-end">
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
            {file.error && (
              <span className="text-[10px] leading-none text-red-500">{file.error}</span>
            )}
            {file.progress === 100 && (
              <span className="text-[10px] leading-none text-emerald-500">تم الرفع</span>
            )}
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              removeFile(file.id);
              onChange?.("");
            }}
            aria-label="إزالة الملف"
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-neutral-100 transition-colors hover:bg-red-100 dark:bg-neutral-800 dark:hover:bg-red-900/50"
          >
            <X className="h-4 w-4 text-neutral-500 dark:text-neutral-400" aria-hidden="true" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={open}
          className={cn(
            "input flex items-center justify-between gap-3 px-4 py-0 text-start transition-all",
            "hover:bg-neutral-50/50 dark:hover:bg-neutral-800/50",
            isInvalid && "border-destructive ring-destructive/20", // Destructive look manually enforced
            isDragActive &&
              !isInvalid &&
              "border-primary-400 bg-primary-50 shadow-inner ring-2 ring-primary-400/20",
            isUploading && "cursor-not-allowed opacity-60",
            "dark:border-neutral-700",
          )}
        >
          <div className="invisible flex-1 overflow-hidden" aria-hidden="true" />
          <FileUp className="h-5 w-5 shrink-0 text-primary-400" />
        </button>
      )}
    </div>
  );
}
