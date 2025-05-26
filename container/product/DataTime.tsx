import { ProductComment } from "@/types";
import { useFormatDate } from "@/Hook/Date/useFormatData"; // 훅을 임포트합니다.

export const DateTime: React.FC<{
  data: ProductComment;
  className?: string; // className은 선택적 속성으로 변경
}> = ({ data, className }) => {
  const { created_at } = data;

  // useFormatDate 훅을 사용하여 날짜 포맷팅
  const formattedDate = useFormatDate(new Date(created_at));

  return <span className={className}>{formattedDate}</span>;
};
