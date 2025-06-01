import { useState } from "react";
import { useRecoilState } from "recoil";
import { IoIosArrowBack } from "react-icons/io";

import SearchInput from "./SearchInput";
import SearchResultsList from "./SearchResultsList";
import RecentSearch from "./RecentSearch";

import Modal from "@/components/common/Modal/ModalContainer";
import LinkIcon from "@/components/common/Link-Icons";
import FlexBox from "@/components/common/FlexBox";
import { OnOffModal } from "@/components/Recoil/Modal/OnOffModal/atom";
import styles from "./index.module.css";
import useBookApi from "@/Hook/Data/useBookApi";

const SearchModal = () => {
  const [modal, setModal] = useRecoilState(OnOffModal);
  const [search, setSearch] = useState<string>("");
  const { searchResults } = useBookApi({
    slug: search,
  });

  return (
    <Modal
      state={modal}
      setModalState={setModal}
      type="MobileSearchModal"
      name="Search"
      aria-label="도서 검색 모달"
      aria-describedby="search-modal-description"
    >
      <div
        className={styles.Container}
        role="dialog"
        aria-modal="true"
        aria-label="도서 검색 모달"
        aria-describedby="search-modal-description"
      >
        <span id="search-modal-description" className="sr-only">
          도서 검색을 위한 모달 창입니다. 검색어를 입력하고 결과를 확인할 수
          있습니다.
        </span>
        <FlexBox
          $justify="space-between"
          $align="center"
          className={styles.InputContainer}
        >
          <LinkIcon
            onClick={() =>
              setModal({ isOpen: false, type: "MobileSearchModal" })
            }
            ButtonIcons={<IoIosArrowBack aria-hidden="true" />}
            className={styles.Icons}
            value="뒤로가기 아이콘"
            aria-label="검색 모달 닫기"
          />
          <SearchInput search={search} setSearch={setSearch} />
        </FlexBox>
        {search.length > 0 ? (
          <SearchResultsList data={searchResults} />
        ) : (
          <RecentSearch />
        )}
      </div>
    </Modal>
  );
};

export default SearchModal;
