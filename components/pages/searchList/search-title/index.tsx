import styles from "./index.module.css";

import TitleTag from "@/components/common/TitleTag";

interface CategoryItem {
  title: string;
}

const SearchListTitle: React.FC<CategoryItem> = ({ title }) => {
  return (
    <TitleTag
      classNames={styles.title}
      level={2}
      aria-label={`${title}에 대한 검색결과`}
    >
      <strong aria-hidden="true">{title}</strong>
      <span aria-hidden="true">에 대한 검색결과</span>
    </TitleTag>
  );
};

export default SearchListTitle;
