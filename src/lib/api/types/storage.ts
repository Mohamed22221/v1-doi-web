export type UploadType = "product" | "category" | "user_profile" | "seller_document";
export type UploadFileType = "image" | "file";

export type TUploadPayload = {
  type: UploadType;
  fileType: UploadFileType;
  files: File[];
};

export type TUploadResponse = {
  statusCode: number;
  success: boolean;
  message: string;
  data: {
    urls: string[];
    count: number;
    fileType: string;
    type: string;
  };
};
