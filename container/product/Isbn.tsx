//* type *
import { BookDataType } from "@/types";

export const Isbn: React.FC<{
  data: BookDataType | null;
  className: string;
}> = ({ data, className }) => {
  if (!data) {
    return null;
  }
  const { isbn } = data;

  if (!data || !data.isbn || data.isbn > 0) {
    return null;
  }

  return <span className={className}>{isbn}</span>;
};
