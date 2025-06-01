"use client";
import Link from "next/link";
import { IoIosClose } from "react-icons/io";

import styles from "./index.module.css";
import TitleTag from "@/components/common/TitleTag";
import FlexBox from "@/components/common/FlexBox";
import { useRecentSearch } from "@/Hook/Storage/useRecentSearchHook";

const RecentSearch = () => {
  // ⭐ 로컬스토리지에서 검색어 가져오는 함수
  const { searches, deleteSearch } = useRecentSearch(); // ✅ 훅 사용

  return (
    <div
      className={styles.Container}
      role="region"
      aria-label="최근 검색어 목록"
    >
      <TitleTag level={3}>최근 검색어</TitleTag>
      <FlexBox $gap={6} $wrap="wrap" role="list" aria-label="검색어 목록">
        {searches.map((search, index) => (
          <div key={index} className={styles.Tag} role="listitem">
            <Link
              href={`/SearchList/${search}`}
              className={styles.FlexButton}
              aria-label={`${search} 검색 결과 보기`}
            >
              {search}
            </Link>
            <button
              onClick={() => deleteSearch(index)}
              className={styles.DeleteButton}
              aria-label={`${search} 검색어 삭제`}
            >
              <IoIosClose aria-hidden="true" />
            </button>
          </div>
        ))}
      </FlexBox>
    </div>
  );
};

export default RecentSearch;
