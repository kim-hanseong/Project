import { useCallback } from "react";

import { useResponsive } from "@/Hook/Responsive/useResponsive";
import SelectPopButton from "@/components/common/Select";

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
    <SelectPopButton
      selected={productForm}
      options={PAGE_SIZE_OPTIONS}
      onChange={handlePageSizeChange}
      label="페이지당 상품 개수"
      formatOption={(option) => `${option.size}개씩 보기`}
      formatSelected={(value) => `${value} 개씩 보기`}
    />
  );
};

export default BestSellerPageSize;
