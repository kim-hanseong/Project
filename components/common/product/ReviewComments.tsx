//* type *
import { ProductComment } from "@/types";

export const ReviewComments: React.FC<{
  data: ProductComment;
  className: string;
}> = ({ data, className }) => {
  const { content } = data;

  return (
    <span className={className} role="article" aria-label="도서 리뷰 내용">
      {content}
    </span>
  );
};
