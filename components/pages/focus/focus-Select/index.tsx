import React, { useCallback } from "react";

// import BestSellerMobileCategor from "./Mobile";
import SelectPopButton from "@/components/common/Select";

// import { useResponsive } from "@/Hook/Responsive/useResponsive";

interface FocusSortingProps {
  productForm: string;
  setProductForm: (form: string) => void;
}

const CATEGORY_LIST = [
  { title: "최신순" },
  { title: "별점높은순" },
  { title: "별점낮은순" },
];

const FocusCommentSorting: React.FC<FocusSortingProps> = ({
  productForm,
  setProductForm,
}) => {
  // const isLargeScreen = useResponsive(768);

  const handleCategoryChange = useCallback(
    (title: string) => {
      setProductForm(title);
    },
    [setProductForm]
  );

  return (
    <SelectPopButton
      selected={productForm}
      options={CATEGORY_LIST}
      onChange={handleCategoryChange}
    />
  );
};

export default FocusCommentSorting;
