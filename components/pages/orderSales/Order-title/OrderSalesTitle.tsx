import { FaFire } from "react-icons/fa";

import styles from "./OrderSalesTitle.module.css";

const OrderSalesTitle = () => {
  return (
    <section className={styles.titleContainer} aria-label="판매량 순 도서 목록">
      <div className={styles.titleWrapper}>
        <FaFire className={styles.fireIcon} aria-hidden="true" />
        <h2 className={styles.title}>판매량 순</h2>
      </div>
      <p className={styles.subtitle}>가장 많이 판매된 도서 TOP 10</p>
    </section>
  );
};

export default OrderSalesTitle;
