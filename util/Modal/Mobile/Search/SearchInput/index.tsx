import { Dispatch, SetStateAction } from "react";
import { IoSearch } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { IoIosCloseCircleOutline } from "react-icons/io";

import styles from "./index.module.css";
import LinkIcon from "@/components/common/Link-Icons";
import { useRecentSearch } from "@/Hook/Storage/useRecentSearchHook";

interface RecentSearchProps {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}

const SearchInput = ({ search, setSearch }: RecentSearchProps) => {
  const router = useRouter();
  const { addSearch } = useRecentSearch(); // ✅ 훅 사용

  return (
    <div className={styles.InfoWrap} role="search" aria-label="도서 검색">
      <input
        type="text"
        placeholder="검색어를 입력해주세요"
        className={styles.Input}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && search.trim() !== "") {
            router.push(`/SearchList/${search}`);
            addSearch(search);
            setSearch("");
          }
        }}
        aria-label="검색어 입력"
        aria-required="true"
        aria-describedby="search-description"
      />
      <span id="search-description" className="sr-only">
        검색어를 입력하고 엔터를 누르거나 검색 버튼을 클릭하세요
      </span>

      <LinkIcon
        onClick={() => setSearch("")}
        ButtonIcons={<IoIosCloseCircleOutline aria-hidden="true" />}
        className={`${styles.CloseIcons} ${
          search.length > 0 ? styles.buttonActive : styles.buttonDisabled
        }`}
        value="검색어 지우기"
        aria-label="검색어 지우기"
        aria-disabled={search.length === 0}
      />

      <LinkIcon
        Href={`/SearchList/${search}`}
        ButtonIcons={<IoSearch aria-hidden="true" />}
        className={styles.Icons}
        value="검색하기"
        aria-label="검색하기"
        aria-disabled={search.trim() === ""}
      />
    </div>
  );
};

export default SearchInput;
