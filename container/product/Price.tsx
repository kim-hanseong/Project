import { BookDataType } from "@/types";

export const CustomPrice: React.FC<{
  data: BookDataType | null;
  Tool: string;
  Custom?: string;
  Price: string;
  DisCount: string;
  SalePrice: string;
}> = ({ data, Tool, Price, Custom, DisCount, SalePrice }) => {
  if (!data) {
    return null;
  }
  const { sale_price, price } = data;

  const calculateDiscountPercentage = () => {
    return Math.round(((price - sale_price) / price) * 100);
  };

  const discountPercentage = calculateDiscountPercentage();

  const formatNumber = (number: number) => {
    return new Intl.NumberFormat().format(number);
  };

  return (
    <div className={Tool}>
      {sale_price < 100 ? (
        <span className={Price}>{formatNumber(price)}원</span>
      ) : (
        <span className={Custom}>
          <strong className={DisCount}>{discountPercentage}%</strong>{" "}
          <span className={Price}>{formatNumber(sale_price)}원</span>
          <s className={SalePrice}>{formatNumber(price)}원</s>
        </span>
      )}
    </div>
  );
};
