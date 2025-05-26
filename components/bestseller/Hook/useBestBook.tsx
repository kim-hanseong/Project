import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";

import { BestSellerState, BestSellerResult, BestSellerActions } from "../types";

import { useBestSellerData } from "./useBestSellerData";
import { useBestSellerCategory } from "./useBestSellerCategory";

import { LoadingAtom } from "@/components/Recoil/Loading/atom";
const useBookFetchDataPagenation = (
  initialState: BestSellerState
): BestSellerResult & BestSellerActions => {
  const [pageSize, setPageSize] = useState(initialState.pageSize);
  const [pagination, setPagination] = useState(initialState.pagination);
  const [sorting, setSorting] = useState(initialState.sorting);
  const [loading, setLoading] = useRecoilState(LoadingAtom);

  const { category, bestSellerDB, setCategory } = useBestSellerCategory(
    initialState.category
  );

  const { data, isLoading, error } = useBestSellerData({
    bestSellerDB,
    pagination,
    pageSize,
    sorting,
  });

  useEffect(() => {
    setLoading((prev) => ({ ...prev, isOpen: isLoading }));
  }, [isLoading, setLoading]);

  return {
    data: data?.books || [],
    comments: data?.comments || [],
    isLoading: isLoading || loading.isOpen,
    error: error as Error | null,
    category,
    pageSize,
    pagination,
    sorting,
    setCategory,
    setPageSize,
    setPagination,
    setSorting,
  };
};

export default useBookFetchDataPagenation;
