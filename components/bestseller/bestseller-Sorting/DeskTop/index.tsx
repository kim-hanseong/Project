import { IoIosArrowUp } from "react-icons/io";

import styles from "./index.module.css";

import PopButton from "@/components/전역/PopButton";

interface CategoryItem {
  title: string;
}
interface BestSellerCategoryProps {
  props: string;
  sorting: CategoryItem[]; // CATEGORY_LIST를 인수로 받을 타입
  handlePageSizeChange: (category: string) => void; // 카테고리 변경 핸들러 타입
}

const BestSellerDesktopSorting: React.FC<BestSellerCategoryProps> = ({
  props,
  sorting,
  handlePageSizeChange,
}) => {
  const RenderSorting = () => {
    return (
      <ul className={styles.SizeTool}>
        {sorting.map((option) => (
          <li key={option.title} className={styles.Item}>
            <button
              className={styles.btn}
              onClick={() => handlePageSizeChange(option.title)}
            >
              {option.title}
            </button>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <PopButton
      value={`정렬순서 보기`}
      className={styles.TriggerBtn}
      ButtonTrigger={<span>{props}</span>}
      ButtonIcons={<IoIosArrowUp />}
      ButtonContent={<RenderSorting />}
      down={true}
    />
  );
};

export default BestSellerDesktopSorting;
