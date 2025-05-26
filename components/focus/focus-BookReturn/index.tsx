import styles from "@/components/focus/focus-BookReturn/index.module.css";
import FlexBox from "@/components/전역/FlexBox";
import Info from "@/components/전역/Info";

const FocusReturn = () => {
  const RETURN_POLICY = [
    {
      title: "배송안내",
      content:
        "주문하신 상품은 상품 종류 및 배송지역에 따라 택배배송, 서점배송, 업체배송 등의 방식으로 진행됩니다.(단, 일부 사서함/관공서 택배 발송은 불가능할 수 있으며, 도서산간지역의 경우 택배 배송이 1~2일 정도 더 소요 될 수 있습니다.)배송기간 : 재고 보유 및 배송조건에 따라 당일에서 최대 3일 가량 소요 (추가 지연시 별도 안내)배송비 : 도서 상품의 주문은 모두 무료배송이며, 일부 도서 외 상품의 경우 배송비가 발생합니다. 도서산간 지역은 추가 배송비가 부과될 수 있습니다.",
    },
    {
      title: "교환/반품이 가능한 경우",
      content:
        "배송 받은 상품이 주문한 상품과 다른 경우소비자에게 인도될 당시 상품이 훼손된 경우상품의 유효기간이 지난 경우",
    },
    {
      title: "교환/반품이 불가능한 경우",
      content:
        "고객 과실로 상품의 일부가 분실 혹은 파손된 경우상품 불량을 제외한 개봉으로 인한 상품 가치의 훼손으로 재판매가 불가능한 경우복제 또는 단기 완독이 가능한 상품의 포장이나 랩핑이 훼손된 경우 (잡지, 만화, 학습서, 교재 등)세트 상품의 일부 교환/반품의 경우 (전체 상품의 교환/반품만 가능)",
    },
    {
      title: "기타 교환/반품 관련 안내",
      content:
        "고객 변심 혹은 과실(오주문)로 인한 상품 교환/반품의 배송비는 고객이 부담상품 불량 혹은 하자로 인한 교환/반품의 경우는 사이트에서 배송료 부담기타 교환/반품과 관련한 문의사항은 고객센터 혹은 1:1 문의를 이용하여 주시기 바랍니다.",
    },
  ];

  return (
    <FlexBox $col={true} $gap={12}>
      <h3 className={styles.Header}>교환/반품/품절 안내</h3>
      {RETURN_POLICY.map(({ title, content }) => (
        <Info
          key={title}
          InfoTitle={title}
          InfoContents={content}
          name={"정보란"}
          className={styles.FocusInfo}
        />
      ))}
    </FlexBox>
  );
};

export default FocusReturn;
