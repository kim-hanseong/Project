import { Skeleton, Image } from "@nextui-org/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { BookDataType } from "@/types";

export const Thumbnail: React.FC<{
  data?: BookDataType | null;
  className: string;
}> = ({ data, className }) => {
  const { thumbnail, title } = data || {};
  const imgRef = useRef<HTMLImageElement>(null);
  const [isSmall, setIsSmall] = useState(false);

  useEffect(() => {
    const checkImageSize = () => {
      if (imgRef.current) {
        setIsSmall(imgRef.current.width < 10); // 🔹 width가 10 미만인지 확인
      }
    };

    checkImageSize();
    window.addEventListener("resize", checkImageSize); // 🔹 반응형 대응

    return () => {
      window.removeEventListener("resize", checkImageSize);
    };
  }, []);

  const handleClick = (data: BookDataType) => {
    if (data) {
      localStorage.setItem("focus", JSON.stringify(data));
    }
  };

  if (!data || isSmall) {
    return (
      <Skeleton
        className={className}
        style={{ aspectRatio: "152 / 219.79", borderRadius: "0.75rem" }} // 원하는 값 설정
      >
        {""}
      </Skeleton>
    );
  }

  return (
    <Link
      href={`/focus/${encodeURIComponent(title || "")}`}
      onClick={() => handleClick(data)}
    >
      <Image
        ref={imgRef}
        className={className}
        alt="상품 이미지"
        src={thumbnail || ""}
      />
    </Link>
  );
};
