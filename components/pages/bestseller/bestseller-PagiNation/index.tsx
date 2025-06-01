import React, { useCallback } from "react";

import BestSellerDeskPagiNation from "./Desktop";

import { useResponsive } from "@/Hook/Responsive/useResponsive";

interface BestSellerPageNation {
  productForm: string;
  setProductForm: (form: string) => void;
}

// Add interface for pagination items
interface PaginationItem {
  page: string;
}

const BestSellerPagiNation: React.FC<BestSellerPageNation> = ({
  productForm,
  setProductForm,
}) => {
  // Recoil: 베스트 셀러 페이지 정보 상태 관리
  const isLargeScreen = useResponsive(768);

  // 페이지 변경 함수
  const handlePageChange = useCallback((page: string) => {
    setProductForm(page);

    // 스크롤 맨 위로 이동
    window.scrollTo({
      top: 0,
      behavior: "smooth", // 부드럽게 스크롤
    });
  }, []);

  // Update pages array to match the interface
  const pages: PaginationItem[] = [
    { page: "1" },
    { page: "2" },
    { page: "3" },
    { page: "4" },
    { page: "5" },
  ];

  if (!isLargeScreen) return null;

  return (
    <BestSellerDeskPagiNation
      productForm={productForm}
      pageNation={pages}
      handlePagiNationChange={handlePageChange}
    />
  );
};

export default BestSellerPagiNation;
