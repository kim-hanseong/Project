//* type *
import { BookDataType } from "@/types";

/**
 * 데이터에서 작가 추출하는 컴포넌트 입니다.
 *
 * @param {thumbnail} Children -- Data 를 props 로 받아서 authors 태그로 변환하여 사용할 수 있습니다
 * @param {data} data -- Data 의 authors 부분을 추출합니다
 * @param {classNames} string -- classNamse 로 전달해 줄 수 있습니다.
 *
 *
 */

export const AuthList: React.FC<{
  data: BookDataType | null;
  className: string;
}> = ({ data, className }) => {
  if (!data) {
    return null;
  }
  const { authors, publisher, datetime } = data;
  const dateTime = new Date(datetime);
  const isValidDate = !isNaN(dateTime.getTime());

  // 날짜 포맷 변경
  const formattedDate = isValidDate
    ? dateTime.toLocaleDateString()
    : "Invalid Date";

  return (
    <div className={className} role="group" aria-label="도서 정보">
      <span aria-label={`저자: ${authors}`}>{authors}</span>
      <span aria-hidden="true"> · </span>
      <span aria-label={`출판사: ${publisher}`}>{publisher}</span>
      <span aria-hidden="true"> · </span>
      <span aria-label={`출판일: ${formattedDate}`}>{formattedDate}</span>
    </div>
  );
};
