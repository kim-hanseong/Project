//* type *
import { BookDataType } from "@/types";

export const Publisher: React.FC<{
  data: BookDataType;
  className: string;
}> = ({ data, className }) => {
  const { publisher } = data;

  if (!data || !data.publisher || data.publisher.length === 0) {
    return null;
  }

  return (
    <span className={className} role="group" aria-label="출판사 정보">
      {publisher}
    </span>
  );
};
