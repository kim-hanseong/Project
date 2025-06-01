import { RxHamburgerMenu } from "react-icons/rx";
import { BiBorderAll } from "react-icons/bi";
import classNames from "classnames";

import styles from "./index.module.css";
import FlexBox from "@/components/common/FlexBox";

interface BestSellerFormChangeProps {
  productForm: string;
  setProductForm: (form: string) => void;
}

const BestSellerFormChange: React.FC<BestSellerFormChangeProps> = ({
  productForm,
  setProductForm,
}) => {
  const handleChange = (change: string) => {
    setProductForm(change);
  };

  const RenderPageSizeList = () => {
    return (
      <FlexBox className={styles.Tool} aria-label="상품 보기 방식 선택">
        <button
          className={classNames(styles.btn, {
            [styles.active]: productForm === "Basis",
          })}
          onClick={() => handleChange("Basis")}
          role="radio"
          aria-checked={productForm === "Basis"}
          aria-label="리스트 형식으로 보기"
        >
          <RxHamburgerMenu aria-hidden="true" />
        </button>
        <button
          className={classNames(styles.btn, {
            [styles.active]: productForm === "Col",
          })}
          onClick={() => handleChange("Col")}
          role="radio"
          aria-checked={productForm === "Col"}
          aria-label="그리드 형식으로 보기"
        >
          <BiBorderAll aria-hidden="true" />
        </button>
      </FlexBox>
    );
  };

  return <RenderPageSizeList />;
};

export default BestSellerFormChange;
