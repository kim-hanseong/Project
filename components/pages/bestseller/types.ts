import { BookDataType, ProductComment } from "@/types";

export interface BestSellerState {
  category: string;
  pageSize: string;
  pagination: string;
  sorting: string;
}

export interface BestSellerActions {
  setCategory: (category: string) => void;
  setPageSize: (size: string) => void;
  setPagination: (page: string) => void;
  setSorting: (sort: string) => void;
}

export interface BestSellerParams {
  bestSellerDB: string;
  pagination: string;
  pageSize: string;
  sorting: string;
}

export interface BestSellerResult {
  data: BookDataType[];
  comments: ProductComment[];
  isLoading: boolean;
  error: Error | null;
  category: string;
  pageSize: string;
  pagination: string;
  sorting: string;
}
