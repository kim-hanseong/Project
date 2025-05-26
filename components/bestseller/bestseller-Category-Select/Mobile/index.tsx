import React, { useState } from "react";
import classNames from "classnames";
import { FaExchangeAlt } from "react-icons/fa";

import styles from "@/components/bestseller/Product-Category-Select/Mobile/index.module.css";
import ModalTrigger from "@/components/전역/Modal/ModalTrigger";
import Modal from "@/components/전역/Modal/ModalContainer";

interface CategoryItem {
  title: string;
}
interface BestSellerCategoryProps {
  props: string;
  categoryList: CategoryItem[]; // CATEGORY_LIST를 인수로 받을 타입
  handleCategoryChange: (category: string) => void; // 카테고리 변경 핸들러 타입
}
const BestSellerMobileCategor: React.FC<BestSellerCategoryProps> = ({
  props,
  categoryList,
  handleCategoryChange,
}) => {
  const [mobile, setMobile] = useState({ type: "Category", isOpen: false });

  const handleCategorySelect = (category: string) => {
    handleCategoryChange(category);
    setMobile((prev) => ({ ...prev, isOpen: false })); // isOpen을 false로 변경
  };

  const RenderMobileCategory = () => (
    <Modal
      state={mobile}
      setModalState={setMobile}
      name="카테고리 Modal"
      type="Category"
    >
      <div
        className={classNames(styles.modalContent, {
          [styles.modalOpen]: mobile.isOpen,
        })}
      >
        <button className={styles.btn}>X</button>
        <ul>
          {categoryList.map((category, index) => (
            <li
              key={index}
              className={classNames(styles.categoryItem, {
                [styles.activeCategory]: props === category.title,
              })}
            >
              <button
                onClick={() => handleCategorySelect(category.title)}
                className={styles.categoryButton}
              >
                {category.title}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </Modal>
  );

  const MobileCategory = () => (
    <ModalTrigger
      ButtonComponent={
        <button className={styles.TriggerBtn}>
          {props}
          <FaExchangeAlt />
        </button>
      }
      setModalState={setMobile}
      type="Category"
      name="카테고리 Modal 오픈"
    />
  );

  return (
    <>
      <RenderMobileCategory />
      <MobileCategory />
    </>
  );
};

export default BestSellerMobileCategor;
