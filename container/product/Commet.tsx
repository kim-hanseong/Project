//* type *
import { BookDataType } from "@/types";

/**
 * 데이터에서 평점을 추출하는 컴포넌트 입니다.
 *
 * @param {Comment} Children -- Data 를 props 로 받아서 리뷰 태그로 변환하여 사용할 수 있습니다
 * @param {data} data -- Data 의 리뷰 부분을 추출합니다
 * @param {classNames} string -- classNamse 로 전달해 줄 수 있습니다.
 * @param {icon} ReactComponent?  -- icons에 컴포넌트를 넣어 태그로 사용가능합니다
 *
 *
 */

export const Comments: React.FC<{
  data: BookDataType;
  className: string;
  Icon?: React.FC | null; // 아이콘 컴포넌트를 선택적으로 설정
}> = ({ data, className, Icon }) => {
  // comments가 없을 경우 빈 배열로 대체
  const comments = data?.comments ?? [];

  return (
    <span className={className}>
      {Icon && <Icon />} ({comments.length}개의 리뷰)
    </span>
  );
};
