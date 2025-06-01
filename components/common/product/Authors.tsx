//* type *
import { BookDataType } from "@/types";

export const Authors: React.FC<{
  data: BookDataType | null; // Allow for data to be null
  className: string;
}> = ({ data, className }) => {
  // Check if data or authors array is unavailable
  if (!data || !data.authors || data.authors.length === 0) {
    return null;
  }

  const authorsList = data.authors.join(", ");
  const authorCount = data.authors.length;

  return (
    <div
      className={className}
      role="group"
      aria-label={`저자 ${authorCount}명: ${authorsList}`}
    >
      {authorsList}
    </div>
  );
};
