import { CiShare2 } from "react-icons/ci";
import { useRecoilState } from "recoil";

import styles from "@/components/focus/focusShareBtn/index.module.css";
import LinkIcon from "@/components/전역/Link-Icons";
import useScrollNavbar from "@/Hook/Event/useScrollEvent";
import { OnOffModal } from "@/components/Recoil/Modal/OnOffModal/atom";
import { ErrorModal } from "@/components/Recoil/Modal/ErrorModal/atom";

const FocusShareBtn = () => {
  const [, setModal] = useRecoilState(OnOffModal);
  const [, setError] = useRecoilState(ErrorModal);

  const { isHidden } = useScrollNavbar(10);

  const handlePageChange = async () => {
    try {
      setModal({ isOpen: true, type: "ShareModal" });

      const url = window.location.href;

      await navigator.clipboard.writeText(url);
      // 복사 성공했을 때 따로 처리하고 싶으면 여기에 추가 가능
    } catch (error) {
      setError({ isOpen: true, type: "RefError" });
    }
  };

  return (
    <LinkIcon
      onClick={handlePageChange}
      ButtonIcons={<CiShare2 />}
      className={`${styles.TopIcons} ${isHidden ? styles.hidden : ""}`}
      value="공유 버튼"
    />
  );
};

export default FocusShareBtn;
