import { FaFire } from "react-icons/fa";
import styles from "./OrderSalesTitle.module.css";

const OrderSalesTitle = () => {
  return (
    <div className={styles.titleContainer}>
      <div className={styles.titleWrapper}>
        <FaFire className={styles.fireIcon} />
        <h2 className={styles.title}>판매량 순</h2>
      </div>
      <p className={styles.subtitle}>가장 많이 판매된 도서 TOP 10</p>
    </div>
  );
};

export default OrderSalesTitle;
