"use client";

import Image from "next/image";
import { Paperclip, X } from "lucide-react";

import { cn } from "@utils/cn";
import { useDropzoneUpload } from "../use-dropzone-upload";
import type { FileUploadBaseProps } from "../file-upload-types";

interface ProductUploadProps extends FileUploadBaseProps {
  /** Label shown above the dropzone */
  label?: string;
  /** Recommended minimum images hint */
  minRecommended?: number;
}

/**
 * ProductUpload
 *
 * Multi-image uploader with a single root dropzone and manual picker trigger.
 * Design:
 * 1. Empty  — large centered icon
 * 2. Strip  — mobile horizontal thumbnails
 * 3. Grid   — desktop cover + grid layout
 */
export function ProductUpload({
  label = "ارفع صور المنتج",
  minRecommended = 3,
  maxFiles = 10,
  maxSize = 10,
  accept = { "image/*": [".jpg", ".jpeg", ".png", ".webp", ".avif"] },
  uploadType,
  fileType = "image",
  onUploadSuccess,
  onUploadError,
  className,
}: ProductUploadProps) {
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

  const hasFiles = files.length > 0;
  const mainImage = files[0];
  const thumbnails = files.slice(1);
  const canAddMore = files.length < maxFiles;

  return (
    <section {...getRootProps()} className={cn("flex w-full flex-col gap-3", className)}>
      <input {...getInputProps()} />

      {/* Header */}
      <h2 className="text-end text-h5 font-bold text-neutral-900 dark:text-neutral-50">{label}</h2>

      {/* Main Dropzone Area */}
      {!hasFiles ? (
        <button
          type="button"
          onClick={open}
          className={cn(
            "flex w-full flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-neutral-200 bg-neutral-50 p-10 transition-colors",
            "hover:border-primary-300 hover:bg-primary-50/50",
            isDragActive && "border-primary-400 bg-primary-50",
            "dark:border-neutral-700 dark:bg-neutral-800/50",
          )}
        >
          <Paperclip
            aria-hidden="true"
            className="h-14 w-14 text-primary-400 dark:text-primary-500"
          />
        </button>
      ) : (
        <>
          {/* Horizontal strip — mobile */}
          <div className="flex flex-row-reverse items-stretch gap-2 overflow-x-auto md:hidden">
            {files.map((item) => (
              <div key={item.id} className="relative aspect-square w-20 shrink-0">
                <Image
                  src={item.previewUrl}
                  alt={item.file.name}
                  fill
                  className="rounded-2xl object-cover"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(item.id);
                  }}
                  aria-label={`إزالة ${item.file.name}`}
                  className="absolute -top-1 -right-1 rounded-full bg-white p-0.5 shadow-sm ring-1 ring-neutral-200 dark:bg-neutral-800 dark:ring-neutral-700"
                >
                  <X className="h-3.5 w-3.5 text-neutral-500" aria-hidden="true" />
                </button>
                {/* Progress bar */}
                {item.progress > 0 && item.progress < 100 && (
                  <div className="absolute inset-x-0 bottom-0 h-1 rounded-b-2xl bg-black/20">
                    <div
                      className="h-full bg-primary-400 transition-all"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                )}
              </div>
            ))}
            {canAddMore && (
              <button
                type="button"
                onClick={open}
                className="flex aspect-square w-20 shrink-0 items-center justify-center rounded-2xl border-2 border-dashed border-neutral-200 bg-neutral-50"
              >
                <Paperclip className="h-6 w-6 text-primary-400" />
              </button>
            )}
          </div>

          {/* Desktop Layout */}
          <div className="hidden flex-col gap-2 md:flex">
            {/* Main Image */}
            {mainImage && (
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl">
                <Image
                  src={mainImage.previewUrl}
                  alt={mainImage.file.name}
                  fill
                  className="object-cover"
                  priority
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(mainImage.id);
                  }}
                  className="absolute top-2 right-2 rounded-full bg-white/90 p-1 shadow-sm dark:bg-neutral-800/90"
                >
                  <X className="h-4 w-4 text-neutral-700" />
                </button>
                {mainImage.progress > 0 && mainImage.progress < 100 && (
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-black/10">
                    <div
                      className="h-full bg-primary-400 transition-all"
                      style={{ width: `${mainImage.progress}%` }}
                    />
                  </div>
                )}
              </div>
            )}

            {/* Thumbnails Grid */}
            <div className="grid grid-cols-3 gap-2">
              {thumbnails.map((item) => (
                <div key={item.id} className="relative aspect-square">
                  <Image
                    src={item.previewUrl}
                    alt={item.file.name}
                    fill
                    className="rounded-xl object-cover"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile(item.id);
                    }}
                    className="absolute -top-1 -right-1 rounded-full bg-white p-0.5 shadow-sm ring-1 ring-neutral-200 dark:bg-neutral-800"
                  >
                    <X className="h-3.5 w-3.5 text-neutral-500" />
                  </button>
                  {item.progress > 0 && item.progress < 100 && (
                    <div className="absolute inset-x-0 bottom-0 h-1 bg-black/10">
                      <div
                        className="h-full bg-primary-400 transition-all"
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                  )}
                </div>
              ))}
              {canAddMore && (
                <button
                  type="button"
                  onClick={open}
                  className="flex aspect-square items-center justify-center rounded-2xl border-2 border-dashed border-neutral-200 bg-neutral-50 hover:bg-neutral-100"
                >
                  <Paperclip className="h-8 w-8 text-primary-400" />
                </button>
              )}
            </div>
          </div>
        </>
      )}

      {/* Helper text */}
      <div className="text-end text-sm text-neutral-500 dark:text-neutral-400">
        {!hasFiles ? (
          <p>أول صورة راح تكون الصورة الرئيسية</p>
        ) : (
          <p>
            أضف ما لا يقل عن {minRecommended} صور (وبحد أقصى {maxFiles} صور) لعرض منتجك بشكل أفضل.
          </p>
        )}
      </div>

      {isUploading && (
        <p className="animate-pulse text-end text-xs text-primary-500">جارٍ الرفع...</p>
      )}
    </section>
  );
}
