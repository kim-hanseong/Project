import { useCallback } from "react";

import BestSellerDesktopPageSize from "./Desktop";

import { useResponsive } from "@/Hook/Responsive/useResponsive";

interface BestSellerPageSizeProps {
  productForm: string;
  setProductForm: (form: string) => void;
}

const PAGE_SIZE_OPTIONS = [
  { size: "10" },
  { size: "13" },
  { size: "15" },
  { size: "20" },
];

const BestSellerPageSize: React.FC<BestSellerPageSizeProps> = ({
  productForm,
  setProductForm,
}) => {
  const isLargeScreen = useResponsive(768);

  const handlePageSizeChange = useCallback((size: string) => {
    setProductForm(size);
  }, []);

  if (!isLargeScreen) return null;

  return (
    <BestSellerDesktopPageSize
      props={productForm}
      pageSize={PAGE_SIZE_OPTIONS}
      handlePageSizeChange={handlePageSizeChange}
    />
  );
};

export default BestSellerPageSize;
