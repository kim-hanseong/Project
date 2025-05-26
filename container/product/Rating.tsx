import { BookDataType } from "@/types";

type CommentType = {
  slug: string;
  rating: number;
};

/**
 * 데이터에서 평점을 추출하는 컴포넌트 입니다.
 *
 * @param {data} data -- Data 의 평점 부분을 추출합니다
 * @param {className} string -- className 으로 전달해 줄 수 있습니다.
 * @param {Icon} React.ReactNode -- JSX 아이콘 요소를 넣을 수 있습니다.
 */
export const Rating: React.FC<{
  data: BookDataType;
  className: string;
  Icon?: React.ReactNode;
}> = ({ data, className, Icon }) => {
  const { comments } = data;

  if (!comments || comments.length === 0) {
    return (
      <div className={className}>
        <span>{Icon}</span>
        <span>0.0</span>
      </div>
    );
  }

  const ratings = comments.map((comment: CommentType) => comment.rating);
  const averageRating =
    ratings.reduce((sum: number, rating: number) => sum + rating, 0) /
    comments.length;

  return (
    <div className={className}>
      <span>{Icon}</span>
      <span>{averageRating.toFixed(1)}</span>
    </div>
  );
};
