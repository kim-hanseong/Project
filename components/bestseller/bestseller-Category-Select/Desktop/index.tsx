import { IoIosArrowUp } from "react-icons/io";

import styles from "@/components/bestseller/bestseller-Category-Select/Desktop/index.module.css";
import PopButton from "@/components/전역/PopButton";

interface CategoryItem {
  title: string;
}
interface BestSellerCategoryProps {
  props: string;
  categoryList: CategoryItem[]; // CATEGORY_LIST를 인수로 받을 타입
  handleCategoryChange: (category: string) => void; // 카테고리 변경 핸들러 타입
}

const BestSellerDesktopCategor: React.FC<BestSellerCategoryProps> = ({
  props,
  categoryList,
  handleCategoryChange,
}) => {
  const RenderCategory = () => {
    return (
      <ul className={styles.SizeTool}>
        {categoryList.map((option) => (
          <li key={option.title} className={styles.Item}>
            <button
              className={styles.btn}
              onClick={() => handleCategoryChange(option.title)}
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
      value={`카테고리변경`}
      className={styles.TriggerBtn}
      ButtonTrigger={<>{props}</>}
      ButtonIcons={<IoIosArrowUp />}
      ButtonContent={<RenderCategory />}
      down={true}
    />
  );
};

export default BestSellerDesktopCategor;
