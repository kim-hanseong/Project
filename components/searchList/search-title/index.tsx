import styles from "./index.module.css";

import TitleTag from "@/components/전역/TitleTag";

interface CategoryItem {
  title: string;
}
const SearchListTitle: React.FC<CategoryItem> = ({ title }) => {
  return (
    <TitleTag classNames={styles.title} level={2}>
      <strong> `{title}`</strong>
      <span>에 대한 검색결과</span>
    </TitleTag>
  );
};

export default SearchListTitle;
