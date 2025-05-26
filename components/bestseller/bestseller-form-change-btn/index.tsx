import { RxHamburgerMenu } from "react-icons/rx";
import { BiBorderAll } from "react-icons/bi";
import classNames from "classnames";

import styles from "@/components/bestseller/bestseller-form-change-btn/index.module.css";
import FlexBox from "@/components/전역/FlexBox";

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
      <FlexBox className={styles.Tool}>
        <button
          className={classNames(styles.btn, {
            [styles.active]: productForm === "Basis",
          })}
          onClick={() => handleChange("Basis")}
        >
          <RxHamburgerMenu />
        </button>
        <button
          className={classNames(styles.btn, {
            [styles.active]: productForm === "Col",
          })}
          onClick={() => handleChange("Col")}
        >
          <BiBorderAll />
        </button>
      </FlexBox>
    );
  };

  return <RenderPageSizeList />;
};

export default BestSellerFormChange;
