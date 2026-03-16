import type { UploadType, UploadFileType } from "@/lib/api/types/storage";
import type { Locale } from "@/lib/i18n/config";

export type { UploadType, UploadFileType };

export interface FileItem {
  /** Unique identifier for the file slot */
  id: string;
  /** The original File object from the input */
  file: File;
  /** Object URL for preview (images). Must be revoked on removal. */
  previewUrl: string;
  /** Upload progress 0–100. -1 = error, 100 = done */
  progress: number;
  /** Uploaded URL from the server */
  uploadedUrl?: string;
  /** Error message if upload failed */
  error?: string;
}

export interface FileUploadBaseProps {
  /** The current language locale */
  locale: Locale;
  /** Maps to the API `type` parameter */
  uploadType: UploadType;
  /** Maps to the API `fileType` parameter */
  fileType?: UploadFileType;
  /** Max number of files (default: 1) */
  maxFiles?: number;
  /** Max file size in MB (default: 5) */
  maxSize?: number;
  /** Accepted MIME types */
  accept?: Record<string, string[]>;
  /** Called when all files have been uploaded successfully */
  onUploadSuccess?: (urls: string[]) => void;
  /** Called when one or more files fail to upload */
  onUploadError?: (error: string) => void;
  /** Additional CSS classes for the root element */
  className?: string;
}
