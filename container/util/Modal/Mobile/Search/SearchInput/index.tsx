import { Dispatch, SetStateAction } from "react";
import { IoSearch } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { IoIosCloseCircleOutline } from "react-icons/io";

import styles from "@/container/util/Modal/Mobile/Search/SearchInput/index.module.css";
import LinkIcon from "@/components/전역/Link-Icons";
import { useRecentSearch } from "@/Hook/Storage/useRecentSearchHook";

interface RecentSearchProps {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}

const SearchInput = ({ search, setSearch }: RecentSearchProps) => {
  const router = useRouter();
  const { addSearch } = useRecentSearch(); // ✅ 훅 사용

  return (
    <div className={styles.InfoWrap}>
      <input
        type="text"
        placeholder="검색어를 입력해주세요"
        className={styles.Input}
        value={search} // ✅ input 값 상태 연결
        onChange={(e) => setSearch(e.target.value)} // ✅ 상태 업데이트
        onKeyDown={(e) => {
          if (e.key === "Enter" && search.trim() !== "") {
            router.push(`/SearchList/${search}`);
            addSearch(search);
            setSearch(""); // ✅ 상태 초기화
          }
        }}
      />
      <LinkIcon
        onClick={() => setSearch("")} // ✅ 검색어 초기화 기능 추가
        ButtonIcons={<IoIosCloseCircleOutline />}
        className={`${styles.CloseIcons} ${
          search.length > 0 ? styles.buttonActive : styles.buttonDisabled
        }`}
        value="닫기 아이콘"
      />

      <LinkIcon
        Href={`/SearchList/${search}`} // ✅ 상태 사용
        ButtonIcons={<IoSearch />}
        className={styles.Icons}
        value="검색 아이콘"
      />
    </div>
  );
};

export default SearchInput;
