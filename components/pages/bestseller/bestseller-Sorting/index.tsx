import { useCallback } from "react";

import SelectPopButton from "@/components/common/Select";

interface BestSellerPageSizeProps {
  productForm: string;
  setProductForm: (form: string) => void;
}

const SORTING_LIST = [{ title: "추천일순 " }, { title: "출간일순" }];

const BestSellerSorting: React.FC<BestSellerPageSizeProps> = ({
  productForm,
  setProductForm,
}) => {
  // const isLargeScreen = useResponsive(768);

  const handlePageSizeChange = useCallback((size: string) => {
    setProductForm(size);
  }, []);

  // if (!isLargeScreen) return null;

  return (
    <SelectPopButton
      selected={productForm}
      options={SORTING_LIST}
      onChange={handlePageSizeChange}
      label="카테고리 변경"
    />
  );
};

export default BestSellerSorting;
