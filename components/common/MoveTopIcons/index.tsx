import { HiOutlineArrowNarrowUp } from "react-icons/hi";

import styles from "./index.module.css";
import LinkIcon from "@/components/common/Link-Icons";
import useScrollNavbar from "@/Hook/Event/useScrollEvent";

const MoveTopIcons = () => {
  const { isHidden } = useScrollNavbar(10);

  const handlePageChange = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <LinkIcon
      onClick={() => handlePageChange()}
      ButtonIcons={<HiOutlineArrowNarrowUp aria-hidden="true" />}
      className={`${styles.TopIcons} ${isHidden ? styles.hidden : ""}`}
      value="페이지 상단으로 이동"
    />
  );
};

export default MoveTopIcons;
