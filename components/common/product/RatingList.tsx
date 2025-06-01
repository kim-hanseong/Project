//* type *
import { AiFillApple } from "react-icons/ai";

import { ProductComment } from "@/types";

export const RatingList: React.FC<{
  data: ProductComment;
  className?: string;
}> = ({ data, className }) => {
  const { rating } = data;

  return (
    <div className={className}>
      {[...Array(5)].map((_, index) => (
        <button
          key={index}
          style={{
            opacity: (rating ? rating : 1) >= index + 1 ? 1 : 0.5,
            transition: "opacity 0.3s ease",
          }}
        >
          <AiFillApple color="red" />
        </button>
      ))}
    </div>
  );
};
