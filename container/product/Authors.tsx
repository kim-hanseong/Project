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

  return <span className={className}>{data.authors.join(", ")}</span>;
};
