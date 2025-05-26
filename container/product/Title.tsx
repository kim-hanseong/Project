import Link from "next/link";
import classNames from "classnames";
import { usePathname } from "next/navigation";

import { BookDataType } from "@/types";
import { useMediaQuery } from "@/Hook/Responsive/useMediaQuery";

export const Title: React.FC<{
  data: BookDataType | null;
  className: string;
}> = ({ data, className }) => {
  const pathname = usePathname();
  const isMobile = useMediaQuery("(max-width: 768px)");

  if (!data?.title) {
    return null;
  }

  const isFocusPage = pathname.startsWith("/focus");
  const isLong = data.title.length > 13;

  const displayTitle = isFocusPage
    ? data.title
    : isMobile && isLong
      ? `${data.title.slice(0, 13)}...`
      : data.title;

  return (
    <Link href={`/focus/${encodeURIComponent(data.title)}`}>
      <span className={classNames(className, "hover:underline")}>
        {displayTitle}
      </span>
    </Link>
  );
};
