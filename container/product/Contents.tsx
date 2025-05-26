import { BookDataType } from "@/types";

interface ProductContentProps {
  data: BookDataType | null;
  className: string;
  sliceLength?: number; // 문자열을 자를 길이, 기본값은 없음
}
/**
 * 데이터에서 컨텐츠를 추출하는 컴포넌트 입니다.
 *
 * @param {Contents} Children -- Data 를 props 로 받아서 컨텐츠 태그로 변환하여 사용할 수 있습니다
 * @param {data} data -- Data 의 Contents 부분을 추출합니다
 * @param {classNames} string -- classNamse 로 전달해 줄 수 있습니다.
 *
 *
 */

export const Content: React.FC<ProductContentProps> = ({
  data,
  className,
  sliceLength,
}) => {
  const { contents } = data;

  if (!data || !data.contents || data.contents.length === 0) {
    return null;
  }

  // sliceLength가 제공되면 해당 길이만큼 자르고, 아니면 전체 내용을 표시
  const truncatedContents = sliceLength
    ? contents.slice(0, sliceLength)
    : contents;

  return <span className={className}>{truncatedContents}</span>;
};
