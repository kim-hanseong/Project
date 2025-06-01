import classNames from "classnames";

import FlexBox from "@/components/common/FlexBox";
import styles from "@/components/layout/Footer/Footer-Intro/index.module.css";

interface CategoryItem {
  title: string;
}
interface List {
  categoryList: CategoryItem[]; // CATEGORY_LIST를 인수로 받을 타입
}

const FooterIntro: React.FC<List> = ({ categoryList }) => {
  return (
    <FlexBox>
      <ul role="navigation" className={styles.categoryList}>
        {categoryList.map((category, index) => (
          <li key={index} className={classNames(styles.categoryItem, {})}>
            <button className={styles.categoryButton}>{category.title}</button>
          </li>
        ))}
      </ul>
    </FlexBox>
  );
};

export default FooterIntro;
