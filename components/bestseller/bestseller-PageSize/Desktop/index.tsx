import { IoIosArrowUp } from "react-icons/io";

import styles from "@/components/bestseller/bestseller-PageSize/Desktop/index.module.css";
import PopButton from "@/components/전역/PopButton";

interface CategoryItem {
  size: string;
}
interface BestSellerCategoryProps {
  props: string;
  pageSize: CategoryItem[]; // CATEGORY_LIST를 인수로 받을 타입
  handlePageSizeChange: (category: string) => void; // 카테고리 변경 핸들러 타입
}

const BestSellerDesktopPageSize: React.FC<BestSellerCategoryProps> = ({
  props,
  pageSize,
  handlePageSizeChange,
}) => {
  const RenderPageSize = () => {
    return (
      <ul className={styles.SizeTool}>
        {pageSize.map((option) => (
          <li key={option.size} className={styles.Item}>
            <button
              className={styles.btn}
              onClick={() => handlePageSizeChange(option.size)}
            >
              {option.size}개씩 보기
            </button>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <PopButton
      value={`${pageSize} 개씩 보기`}
      className={styles.TriggerBtn}
      ButtonTrigger={<span>{props} 개씩 보기</span>}
      ButtonIcons={<IoIosArrowUp />}
      ButtonContent={<RenderPageSize />}
      down={true}
    />
  );
};

export default BestSellerDesktopPageSize;
