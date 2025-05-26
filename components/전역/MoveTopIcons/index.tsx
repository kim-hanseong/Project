import { HiOutlineArrowNarrowUp } from "react-icons/hi";

import styles from "@/components/전역/MoveTopIcons/index.module.css";
import LinkIcon from "@/components/전역/Link-Icons";
import useScrollNavbar from "@/Hook/Event/useScrollEvent";

const MoveTopIcons = () => {
  const { isHidden } = useScrollNavbar(10);

  const handlePageChange = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <LinkIcon
      onClick={() => handlePageChange()}
      ButtonIcons={<HiOutlineArrowNarrowUp />}
      className={`${styles.TopIcons} ${isHidden ? styles.hidden : ""}`}
      value="MoveTop Button"
    />
  );
};

export default MoveTopIcons;
