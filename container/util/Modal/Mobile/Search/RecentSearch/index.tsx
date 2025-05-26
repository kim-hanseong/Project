"use client";
import Link from "next/link";
import { IoIosClose } from "react-icons/io";

import styles from "@/container/util/Modal/Mobile/Search/RecentSearch/index.module.css";
import TitleTag from "@/components/전역/TitleTag";
import FlexBox from "@/components/전역/FlexBox";
import { useRecentSearch } from "@/Hook/Storage/useRecentSearchHook";

const RecentSearch = () => {
  // ⭐ 로컬스토리지에서 검색어 가져오는 함수
  const { searches, deleteSearch } = useRecentSearch(); // ✅ 훅 사용

  return (
    <div className={styles.Container}>
      <TitleTag level={3}>최근 검색어</TitleTag>
      <FlexBox $gap={6} $wrap="wrap">
        {searches.map((search, index) => (
          <div key={index} className={styles.Tag}>
            <Link href={`/SearchList/${search}`} className={styles.FlexButton}>
              {search}
            </Link>
            <button
              onClick={() => deleteSearch(index)}
              className={styles.DeleteButton}
            >
              <IoIosClose />
            </button>
          </div>
        ))}
      </FlexBox>
    </div>
  );
};

export default RecentSearch;
