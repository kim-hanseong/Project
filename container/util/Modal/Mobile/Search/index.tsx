import { useState } from "react";
import { useRecoilState } from "recoil";
import { IoIosArrowBack } from "react-icons/io";

import SearchInput from "./SearchInput";
import SearchResultsList from "./SearchResultsList";
import RecentSearch from "./RecentSearch";

import Modal from "@/components/전역/Modal/ModalContainer";
import LinkIcon from "@/components/전역/Link-Icons";
import FlexBox from "@/components/전역/FlexBox";
import { OnOffModal } from "@/components/Recoil/Modal/OnOffModal/atom";
import styles from "@/container/util/Modal/Mobile/Search/index.module.css";
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
    >
      <div className={styles.Container}>
        <FlexBox
          $justify="space-between"
          $align="center"
          className={styles.InputContainer}
        >
          <LinkIcon
            onClick={() =>
              setModal({ isOpen: false, type: "MobileSearchModal" })
            }
            ButtonIcons={<IoIosArrowBack />}
            className={styles.Icons}
            value="뒤로가기 아이콘"
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
