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
    <div className={Tool} role="group" aria-label="도서 가격 정보">
      {sale_price < 100 ? (
        <span className={Price} aria-label={`정가: ${formatNumber(price)}원`}>
          {formatNumber(price)}원
        </span>
      ) : (
        <span
          className={Custom}
          aria-label={`할인율 ${discountPercentage}%, 할인가 ${formatNumber(sale_price)}원, 정가 ${formatNumber(price)}원`}
        >
          <strong
            className={DisCount}
            aria-label={`할인율 ${discountPercentage}%`}
          >
            {discountPercentage}%
          </strong>{" "}
          <span
            className={Price}
            aria-label={`할인가 ${formatNumber(sale_price)}원`}
          >
            {formatNumber(sale_price)}원
          </span>
          <s className={SalePrice} aria-label={`정가 ${formatNumber(price)}원`}>
            {formatNumber(price)}원
          </s>
        </span>
      )}
    </div>
  );
};
