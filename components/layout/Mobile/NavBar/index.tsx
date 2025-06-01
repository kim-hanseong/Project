import { IoIosArrowBack } from "react-icons/io";
import { RiHome2Line } from "react-icons/ri";
import { IoSearch } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { AiOutlineShoppingCart } from "react-icons/ai";

import TitleTag from "../../../common/TitleTag";

import styles from "./index.module.css";

//* 컴포넌트 import *
import FlexBox from "@/components/common/FlexBox";
import LinkIcon from "@/components/common/Link-Icons";
import ModalTrigger from "@/components/common/Modal/ModalTrigger";
import { OnOffModal } from "@/components/Recoil/Modal/OnOffModal/atom";
import useScrollNavbar from "@/Hook/Event/useScrollEvent";
import { ModalStateType } from "@/types";

type MobileNavbarProps = {
  Title: string;
  mode: "full" | "Base";
};
// MobileNavbar 컴포넌트
const MobileNavbar: React.FC<MobileNavbarProps> & {
  Title: React.FC<{ Title: string }>;
  BackButton: React.FC<{
    onClick: () => void;
  }>;
  HomeButton: React.FC;
  SearchButton: React.FC<{
    setModal: React.Dispatch<React.SetStateAction<ModalStateType>>;
  }>;
  CartButton: React.FC;
} = ({ Title, mode }) => {
  const router = useRouter();
  const [, setModal] = useRecoilState(OnOffModal);
  const { isHidden, isBgWhite } = useScrollNavbar(10);

  return (
    <>
      {mode === "full" && (
        <nav
          className={`${styles.NavbarContainer} ${isHidden && !isBgWhite ? styles.hidden : ""} ${isBgWhite ? styles.bgWhite : ""}`}
          aria-label="모바일 네비게이션"
        >
          <FlexBox
            $justify="space-between"
            $align="center"
            className="w-full h-full"
          >
            <FlexBox $align="center" $gap={2} className={styles.test}>
              <MobileNavbar.BackButton onClick={() => router.back()} />
              <MobileNavbar.HomeButton />
            </FlexBox>
            <MobileNavbar.Title Title={Title} />
            <FlexBox $align="center" $gap={2} className={styles.flexBox}>
              <MobileNavbar.SearchButton setModal={setModal} />
              <MobileNavbar.CartButton />
            </FlexBox>
          </FlexBox>
        </nav>
      )}

      {mode === "Base" && (
        <nav
          className={`${styles.NavbarContainer} ${isHidden && !isBgWhite ? styles.hidden : ""} ${isBgWhite ? styles.bgWhite : ""}`}
          aria-label="모바일 네비게이션"
        >
          <FlexBox $justify="space-between" $align="center" className="w-full">
            <FlexBox className={styles.test}>
              <MobileNavbar.BackButton onClick={() => router.back()} />
            </FlexBox>
            <MobileNavbar.Title Title={Title} />
            <FlexBox className={styles.flexBox}>
              <MobileNavbar.CartButton />
            </FlexBox>
          </FlexBox>
        </nav>
      )}
    </>
  );
};

// 서브 컴포넌트 정의
MobileNavbar.Title = ({ Title }) => (
  <TitleTag level={3} classNames={styles.title}>
    {Title}
  </TitleTag>
);

// 뒤로가기 버튼
MobileNavbar.BackButton = () => (
  <LinkIcon
    Href="/bestseller"
    ButtonIcons={<IoIosArrowBack aria-hidden="true" />}
    className={styles.Icons}
    value="뒤로가기"
    aria-label="이전 페이지로 이동"
  />
);

// 홈 이동 버튼
MobileNavbar.HomeButton = () => (
  <LinkIcon
    Href="/"
    ButtonIcons={<RiHome2Line aria-hidden="true" />}
    className={styles.Icons}
    value="홈으로 이동"
    aria-label="홈으로 이동"
  />
);

// 검색 모달 버튼
MobileNavbar.SearchButton = ({ setModal }) => (
  <ModalTrigger
    ButtonComponent={
      <button className={styles.Icons} aria-label="검색하기">
        <IoSearch aria-hidden="true" />
      </button>
    }
    setModalState={setModal}
    type="MobileSearchModal"
    name="검색 모달 오픈"
  />
);

// 장바구니 버튼
MobileNavbar.CartButton = () => (
  <LinkIcon
    Href="/cart"
    ButtonIcons={<AiOutlineShoppingCart aria-hidden="true" />}
    className={styles.Icons}
    value="장바구니로 이동"
    aria-label="장바구니로 이동"
  />
);
MobileNavbar.Title.displayName = "MobileNavbar.Title";
MobileNavbar.BackButton.displayName = "MobileNavbar.BackButton";
MobileNavbar.HomeButton.displayName = "MobileNavbar.Title";
MobileNavbar.SearchButton.displayName = "MobileNavbar.SearchButton";
MobileNavbar.CartButton.displayName = "MobileNavbar.CartButton";

export default MobileNavbar;
