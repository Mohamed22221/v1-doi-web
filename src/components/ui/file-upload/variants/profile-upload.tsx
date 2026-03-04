"use client";

import Image from "next/image";
import { Pencil } from "lucide-react";

import { cn } from "@utils/cn";
import { useDropzoneUpload } from "../use-dropzone-upload";
import type { FileUploadBaseProps } from "../file-upload-types";

interface ProfileUploadProps extends FileUploadBaseProps {
  /** Current avatar URL (from existing profile) */
  currentAvatarUrl?: string;
  /** Alt text for the avatar image */
  avatarAlt?: string;
}

/**
 * ProfileUpload
 *
 * Circular avatar uploader with an edit badge.
 * Logic: manual open() trigger to avoid conflict with nested buttons.
 */
export function ProfileUpload({
  currentAvatarUrl,
  avatarAlt = "الصورة الشخصية",
  maxFiles = 1,
  maxSize = 5,
  accept = { "image/*": [".jpg", ".jpeg", ".png", ".webp"] },
  uploadType,
  fileType = "image",
  onUploadSuccess,
  onUploadError,
  className,
}: ProfileUploadProps) {
  const { files, isDragActive, isUploading, getRootProps, getInputProps, open } = useDropzoneUpload(
    {
      uploadType,
      fileType,
      maxFiles,
      maxSize,
      accept,
      autoUpload: true,
      onUploadSuccess,
      onUploadError,
    },
  );

  const preview = files[0]?.previewUrl ?? currentAvatarUrl;
  const progress = files[0]?.progress ?? 0;

  return (
    <div
      {...getRootProps()}
      className={cn("group relative inline-flex shrink-0 items-center justify-center", className)}
    >
      <input {...getInputProps()} />

      <button
        type="button"
        onClick={open}
        aria-label="تغيير الصورة الشخصية"
        className={cn(
          "relative h-24 w-24 overflow-hidden rounded-full bg-neutral-200 ring-2 ring-white transition-all dark:bg-neutral-800 dark:ring-neutral-900",
          isDragActive && "scale-105 ring-primary-400",
          isUploading && "cursor-wait opacity-70",
        )}
      >
        {preview ? (
          <Image src={preview} alt={avatarAlt} fill className="object-cover" />
        ) : (
          <svg
            viewBox="0 0 96 96"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="h-full w-full"
          >
            <rect width="96" height="96" rx="48" fill="#E2E8F0" />
            <circle cx="48" cy="38" r="16" fill="#94A3B8" />
            <path
              d="M16 80c0-17.673 14.327-32 32-32s32 14.327 32 32"
              stroke="#94A3B8"
              strokeWidth="2"
              fill="#94A3B8"
            />
          </svg>
        )}

        {/* Progress Overlay */}
        {progress > 0 && progress < 100 && (
          <div className="absolute inset-0 flex items-end bg-black/20">
            <div
              className="h-1 w-full bg-primary-400 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </button>

      {/* Edit Badge */}
      <div
        aria-hidden="true"
        className="absolute end-0 bottom-1 flex h-7 w-7 items-center justify-center rounded-full bg-primary-900 shadow-lg ring-2 ring-white dark:bg-primary-800 dark:ring-neutral-900"
      >
        <Pencil className="h-3.5 w-3.5 text-white" />
      </div>
    </div>
  );
}
