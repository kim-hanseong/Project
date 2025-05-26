import { CiShare2 } from "react-icons/ci";

import styles from "@/container/util/Button/ShareBtn/index.module.css";
import { useResponsive } from "@/Hook/Responsive/useResponsive";
import LinkIcon from "@/components/전역/Link-Icons";
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
      ButtonIcons={<CiShare2 />}
      className={`${styles.TopIcons} ${isHidden ? styles.hidden : ""}`}
      value="MoveTop Button"
    />
  );
};

export default ShareBtn;
