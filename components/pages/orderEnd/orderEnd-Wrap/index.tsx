import { CiShoppingCart } from "react-icons/ci";

import styles from "./index.module.css";

import FlexBox from "@/components/common/FlexBox";
import Info from "@/components/common/Info";
import LinkIcon from "@/components/common/Link-Icons";

const OrderEndWrap: React.FC & {
  Body: React.FC<{ children: React.ReactNode }>;
  Icons: React.FC;
  EndTitle: React.FC;
  EndInfo: React.FC;
} = () => {
  return (
    <OrderEndWrap.Body>
      <OrderEndWrap.Icons />
      <OrderEndWrap.EndTitle />
      <OrderEndWrap.EndInfo />
    </OrderEndWrap.Body>
  );
};

OrderEndWrap.Body = ({ children }) => (
  <div className={styles.titleWrap}>
    <FlexBox
      $col={true}
      $align="center"
      $justify="center"
      className={styles.successContainer}
    >
      {children}
    </FlexBox>
  </div>
);

OrderEndWrap.Icons = () => (
  <LinkIcon
    ButtonIcons={<CiShoppingCart />}
    className={styles.Icons}
    value="장바구니 아이콘"
  />
);
OrderEndWrap.EndTitle = () => (
  <p className={styles.successMessage}>결제가 정상적으로 완료되었습니다.</p>
);
OrderEndWrap.EndInfo = () => (
  <Info
    name="결제 안내"
    InfoTitle="구매해주셔서 감사합니다!"
    InfoContents="주문 내역은 마이페이지에서 확인하실 수 있습니다."
    className={styles.infoBox}
  />
);
OrderEndWrap.Body.displayName = "OrderProduct.DisPlay";
OrderEndWrap.Icons.displayName = "OrderProduct.Menu";
OrderEndWrap.EndTitle.displayName = "OrderProduct.Item";
OrderEndWrap.EndInfo.displayName = "OrderProduct.InfoSection";

export default OrderEndWrap;
