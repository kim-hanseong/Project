import { useRecoilState } from "recoil";
import { RiHome2Line } from "react-icons/ri";
import { IoSearch } from "react-icons/io5";
import { IoMdPerson } from "react-icons/io";

import styles from "./index.module.css";

//* Recoil, Modal 상태 import *
import { OnOffModal } from "@/components/Recoil/Modal/OnOffModal/atom";
//* Hook import *
import useScrollNavbar from "@/Hook/Event/useScrollEvent";
import { useResponsive } from "@/Hook/Responsive/useResponsive";
//* 스타일 import *
//* 컴포넌트 import *
import FlexBox from "@/components/common/FlexBox";
import LinkIcon from "@/components/common/Link-Icons";
import ModalTrigger from "@/components/common/Modal/ModalTrigger";
import { ModalStateType } from "@/types";

//  MobileBottom 컴포넌트
const MobileBottom: React.FC & {
  SearchButton: React.FC<{
    setModal: React.Dispatch<React.SetStateAction<ModalStateType>>;
  }>;
  HomeButton: React.FC;
  RecentFocusButton: React.FC;
} = () => {
  const isLargeScreen = useResponsive(768);
  const [, setModal] = useRecoilState(OnOffModal);
  const { isHidden } = useScrollNavbar(10);

  // ✅ isLargeScreen이 true이면 모바일이 아니므로 렌더링하지 않음
  if (isLargeScreen) return null;

  return (
    <div
      className={`${styles.NavbarContainer} ${isHidden ? styles.hidden : ""}`}
    >
      <div className="w-full relative">
        <FlexBox $justify="space-between" className={styles.FlexBox}>
          <MobileBottom.SearchButton setModal={setModal} />
          <MobileBottom.HomeButton />
          <MobileBottom.RecentFocusButton />
        </FlexBox>
      </div>
    </div>
  );
};

// 서브 컴포넌트 정의

// 검색 버튼
MobileBottom.SearchButton = ({ setModal }) => (
  <ModalTrigger
    ButtonComponent={
      <button className={styles.Icons}>
        <IoSearch />
      </button>
    }
    setModalState={setModal}
    type="MobileSearchModal"
    name="검색 모달 오픈 아이콘"
  />
);

// 홈 버튼
MobileBottom.HomeButton = () => (
  <LinkIcon
    Href="/"
    ButtonIcons={<RiHome2Line />}
    className={styles.Icons}
    value="홈 이동 아이콘"
  />
);

// 최근 Focus 목록 버튼
MobileBottom.RecentFocusButton = () => (
  <LinkIcon
    Href="/myPage"
    ButtonIcons={
      <button className={styles.Icons}>
        <IoMdPerson />
      </button>
    }
    className={styles.Icons}
    value="마이페이지"
  />
);

// displayName 설정
MobileBottom.SearchButton.displayName = " MobileBottom.SearchButton";
MobileBottom.HomeButton.displayName = " MobileBottom.HomeButton";
MobileBottom.RecentFocusButton.displayName = " MobileBottom.RecentFocusButton";

export default MobileBottom;
