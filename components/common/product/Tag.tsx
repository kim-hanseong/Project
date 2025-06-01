import FlexBox from "@/components/common/FlexBox";
import { BookDataType } from "@/types";

/**
 * 책에 맞는 태그를 작성하는 컴포넌트 입니다.
 *
 * @param {data} data -- Data 의 Content 부분을 추출해 태그로 변환시켜줍니다
 * @param {classNames} string -- className 로 전달해 줄 수 있습니다.
 */

export const Tag: React.FC<{
  data: BookDataType;
  className?: string;
}> = ({ data, className }) => {
  const { contents } = data;
  const keywords = [
    "음악",
    "경제",
    "사회",
    "가요",
    "소설",
    "요리",
    "시",
    "인문",
    "가정",
    "육아",
    "건강",
    "스포츠",
    "경제",
    "경영",
    "자기계발",
    "정치",
    "역사",
    "문화",
    "종교",
    "예술",
    "대중문화",
    "참고서",
    "기술",
    "공학",
    " 외국어",
    "과학",
    "취업",
    "수험서",
    "여행",
    "컴퓨터",
    "IT",
    "잡지",
    "청소년",
    "초등참고서",
    "유아",
    "어린이",
    "만화",
    "대학교제",
  ];

  const matchingKeywords = Array.from(
    new Set(keywords.filter((keyword) => contents.includes(keyword)))
  );

  if (matchingKeywords.length === 0) {
    return null; // Return null if there are no matching keywords
  }

  return (
    <div role="group" aria-label="도서 태그 목록">
      <FlexBox $gap={2} $wrap="wrap">
        {matchingKeywords.slice(0, 3).map((keyword, index) => (
          <button
            key={index}
            className={className}
            aria-label={`${keyword} 태그`}
          >
            <span
              className="px-3 py-1 rounded-full text-sm bg-[#000] text-white"
              aria-hidden="true"
            >
              {keyword}
            </span>
          </button>
        ))}
      </FlexBox>
    </div>
  );
};
