import { CiShare2 } from "react-icons/ci";

import styles from "@/container/util/Button/ShareBtn/index.module.css";
import { useResponsive } from "@/Hook/Responsive/useResponsive";
import LinkIcon from "@/components/common/Link-Icons";
import useScrollNavbar from "@/Hook/Event/useScrollEvent";

const ShareBtn = () => {
  const isLargeScreen = useResponsive(768);
  const { isHidden, isTop } = useScrollNavbar(10);

  if (isLargeScreen || isTop) return null;

  const handlePageChange = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <LinkIcon
      onClick={() => handlePageChange()}
      ButtonIcons={<CiShare2 aria-hidden="true" />}
      className={`${styles.TopIcons} ${isHidden ? styles.hidden : ""}`}
      value="페이지 상단으로 이동"
    />
  );
};

export default ShareBtn;
