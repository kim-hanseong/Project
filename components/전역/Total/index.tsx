import { BookDataType } from "@/types";

interface TotalCountProps {
  data: BookDataType[];
  Total: string;
  Total2?: string;
  state?: Record<string, number>; // 추가! 수량 받을 수 있게
  label?: string;
  unit?: string;
  classNames?: string;
}

const TotalCount: React.FC<TotalCountProps> = ({
  data,
  Total,
  Total2,
  state,
  label = "",
  unit = "",
  classNames,
}) => {
  const totalCount = data.reduce((total, book) => {
    const value1 = book[Total as keyof BookDataType];
    const value2 = Total2 ? book[Total2 as keyof BookDataType] : 0;

    const num1 = typeof value1 === "number" ? value1 : 0;
    const num2 = typeof value2 === "number" ? value2 : 0;

    const quantity = state ? (state[book.title] ?? 1) : 1; // state가 있으면 수량 곱해주기

    return total + quantity * (num1 - num2);
  }, 0);

  return (
    <span className={classNames}>
      {label}
      {totalCount.toLocaleString()}
      {unit}
    </span>
  );
};

export default TotalCount;
