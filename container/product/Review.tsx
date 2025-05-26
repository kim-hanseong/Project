//* type *
import { ProductComment } from "@/types";

export const ReviewComments: React.FC<{
  data: ProductComment;
  className?: string;
}> = ({ data, className }) => {
  const { content } = data;

  if (content) {
    return <div className={className}>{content}</div>;
  } else null;
};
