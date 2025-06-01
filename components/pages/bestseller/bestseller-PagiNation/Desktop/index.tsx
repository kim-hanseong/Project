import classNames from "classnames";

import styles from "./index.module.css";

interface CategoryItem {
  page: string;
}

interface BestSellerPageNation {
  productForm: string;
  pageNation: CategoryItem[]; // CATEGORY_LIST를 인수로 받을 타입
  handlePagiNationChange: (form: string) => void; // 카테고리 변경 핸들러 타입
}

const BestSellerDeskPagiNation: React.FC<BestSellerPageNation> = ({
  productForm,
  pageNation,
  handlePagiNationChange,
}) => {
  // 페이지네이션 데이터

  return (
    <div className={styles.PageNationTool}>
      {pageNation.map((page) => (
        <button
          key={page.page}
          className={classNames(styles.Page, {
            [styles.Focus]: productForm === page.page,
          })}
          onClick={() => handlePagiNationChange(page.page)}
          aria-current={productForm === page.page ? "page" : undefined}
          aria-label={`${page.page} 페이지로 이동`}
        >
          {page.page}
        </button>
      ))}
    </div>
  );
};

export default BestSellerDeskPagiNation;
