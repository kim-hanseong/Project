//* type *
import { ProductComment } from "@/types";

export const ReviewComments: React.FC<{
  data: ProductComment;
  className: string;
}> = ({ data, className }) => {
  const { content } = data;

  return <span className={className}>{content}</span>;
};
