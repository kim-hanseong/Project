import React, { useCallback } from "react";

// import BestSellerMobileCategor from "./Mobile";
import SelectPopButton from "@/components/common/Select";

// import { useResponsive } from "@/Hook/Responsive/useResponsive";

interface BestSellerCategoryProps {
  productForm: string;
  setProductForm: (form: string) => void;
}

const CATEGORY_LIST = [
  { title: "전체" },
  { title: "국내도서" },
  { title: "외국도서" },
  { title: "eBook" },
];

const BestSellerCategor: React.FC<BestSellerCategoryProps> = ({
  productForm,
  setProductForm,
}) => {
  // const isLargeScreen = useResponsive(768);

  const handleCategoryChange = useCallback(
    (category: string) => {
      setProductForm(category);
    },
    [setProductForm]
  );

  return (
    <SelectPopButton
      selected={productForm}
      options={CATEGORY_LIST}
      onChange={handleCategoryChange}
      label="카테고리 변경"
    />
  );
};

export default BestSellerCategor;
