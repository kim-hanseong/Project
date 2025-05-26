import React, { useCallback } from "react";

// import BestSellerMobileCategor from "./Mobile";
import BestSellerDesktopCategor from "./Desktop";

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

  const CategoryComponent = BestSellerDesktopCategor;
  // : BestSellerMobileCategor;

  return (
    <CategoryComponent
      props={productForm}
      categoryList={CATEGORY_LIST}
      handleCategoryChange={handleCategoryChange}
    />
  );
};

export default BestSellerCategor;
