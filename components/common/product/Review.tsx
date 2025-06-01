//* type *
import { ProductComment } from "@/types";

export const ReviewComments: React.FC<{
  data: ProductComment;
  className?: string;
}> = ({ data, className }) => {
  const { content } = data;

  if (content) {
    return (
      <div className={className} role="article" aria-label="도서 리뷰">
        {content}
      </div>
    );
  } else {
    return null;
  }
};
