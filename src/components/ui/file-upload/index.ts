// Variants
export { ProductUpload } from "./variants/product-upload";
export { IdentityUpload } from "./variants/identity-upload";
export { ProfileUpload } from "./variants/profile-upload";
export { SimpleBoxUpload } from "./variants/simple-box-upload";

// Base hook (for custom variants)
export { useDropzoneUpload } from "./use-dropzone-upload";

// Types
export type {
  FileItem,
  FileUploadBaseProps,
  UploadType,
  UploadFileType,
} from "./file-upload-types";
