import { useCallback } from "react";

import BestSellerDesktopSorting from "./DeskTop";

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
    <BestSellerDesktopSorting
      props={productForm}
      sorting={SORTING_LIST}
      handlePageSizeChange={handlePageSizeChange}
    />
  );
};

export default BestSellerSorting;
