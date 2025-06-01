import styles from "./index.module.css";

import Info from "@/components/common/Info";
import FlexBox from "@/components/common/FlexBox";

const CartPrecaution = () => {
  const RETURN_POLICY = [
    {
      content: "택배 배송일정은 기본배송지 기준으로 예상일이 노출됩니다.",
    },
    {
      content:
        "상품별 배송일정이 서로 다를시 가장 늦은 일정의 상품 기준으로 모두 함께 배송됩니다. ",
    },
    {
      content:
        "배송지 수정시 예상일이 변경 될 수 있으며, 주문서에서 배송일정을 꼭 확인하시기 바랍니다.",
    },
    {
      content:
        "쿠폰, 통합포인트, 교환권 사용시 적립예정포인트가 변동 될 수 있습니다.",
    },
  ];

  return (
    <FlexBox
      $col={true}
      className={styles.InfoWrap}
      $justify="center"
      aria-label="장바구니 유의사항"
    >
      {RETURN_POLICY.map(({ content }) => (
        <Info
          key={content}
          InfoContents={content}
          name={"정보란"}
          className={styles.FocusInfo}
        />
      ))}
    </FlexBox>
  );
};

export default CartPrecaution;
