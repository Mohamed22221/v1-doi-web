export type TAPIResponse<T> = {
  status: boolean;
  success?: boolean;
  message: string;
  data: T;
  pagination?: TPaginationSimple;
};

export type TAPIResponseItems<T> = {
  status: true;
  message: string;
  data: {
    items: T;
  } & TPaginationSimple;
};

export type TAPIResponseItem<T> = {
  status: true;
  message: string;
  data: T;
};

export type TPaginationSimple = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type ActionState<T> = { success: true; data: T } | { success: false; error: string };
