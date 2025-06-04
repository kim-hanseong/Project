import { useCallback, useMemo } from "react";
import { CiShare2 } from "react-icons/ci";
import { useRecoilState } from "recoil";

import styles from "./index.module.css";

import LinkIcon from "@/components/common/Link-Icons";
import useScrollNavbar from "@/Hook/Event/useScrollEvent";
import { OnOffModal } from "@/components/Recoil/Modal/OnOffModal/atom";
import { useErrorModal } from "@/Hook/Data/useError";

const FocusShareBtn = () => {
  const { openError } = useErrorModal();

  const [, setModal] = useRecoilState(OnOffModal);

  const { isHidden } = useScrollNavbar(10);

  const handlePageChange = useCallback(async () => {
    try {
      setModal({ isOpen: true, type: "ShareModal" });
      const url = window.location.href;

      await navigator.clipboard.writeText(url);
    } catch (error) {
      openError("RefError");
    }
  }, [setModal]);

  const buttonClassName = useMemo(
    () => `${styles.TopIcons} ${isHidden ? styles.hidden : ""}`,
    [isHidden]
  );

  return (
    <LinkIcon
      aria-label="현재 페이지 공유하기"
      aria-haspopup="dialog"
      aria-expanded={false}
      onClick={handlePageChange}
      ButtonIcons={<CiShare2 />}
      className={buttonClassName}
      value="공유 버튼"
    />
  );
};

export default FocusShareBtn;
