import { useEffect, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";

import styles from "./index.module.css";

//* 컴포넌트 import *
import TotalCount from "@/components/common/Total";
import Info from "@/components/common/Info";
import { SyncShopData } from "@/data/supabase";
import { BookDataType } from "@/types";

interface ProductProps {
  data: BookDataType[];
  state: Record<string, number>;
}

//  TopPriceWrap 컴포넌트
const TopPriceWrap: React.FC<ProductProps> & {
  PriceInfo: React.FC<{ title: string; content: JSX.Element | string }>;
  OrderButton: React.FC<{
    isDataEmpty: boolean;
    onClick: () => void;
    data: BookDataType[];
    state: number;
  }>;
} = ({ data, state }) => {
  const router = useRouter();
  const pathname = usePathname(); // 현재 경로 가져오기

  // 주문 처리 함수
  const handleOrder = async () => {
    await SyncShopData(data);
    if (pathname === "/order") {
      router.push("/orderEnd");
    } else {
      router.push("/order");
    }
  };

  // 페이지가 언로드되기 전에 주문 데이터 동기화
  useEffect(() => {
    const handleBeforeUnload = async (_e: BeforeUnloadEvent) => {
      await handleOrder();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [data]);
  const total = Object.values(state).reduce((sum, count) => sum + count, 0);

  // 데이터가 비었는지 확인
  const isDataEmpty = data.length === 0;
  const totalPrice = data.reduce((sum, item) => {
    return sum + item.price * item.numbering;
  }, 0);
  // 할인 금액 총합 계산 (10%)
  const totalDiscount = data.reduce((sum, item) => {
    return sum + item.price * item.numbering * 0.1;
  }, 0);

  // 결제 예정 금액 계산 (90%)
  const totalExpectedPrice = data.reduce((sum, item) => {
    return sum + item.price * item.numbering * 0.9;
  }, 0);

  // 상품, 배송비, 할인, 결제 예정 금액 계산
  const returnPolicy = useMemo(
    () => [
      {
        title: "상품금액:",
        content: <>{totalPrice.toLocaleString()}원</>,
      },
      {
        title: "배송비:",
        content: "0원",
      },
      {
        title: "상품할인:",
        content: <>{Math.floor(totalDiscount).toLocaleString()}원</>,
      },
      {
        title: "결제 예정 금액:",
        content: <>{Math.floor(totalExpectedPrice).toLocaleString()}원</>,
      },
    ],
    [data, state]
  );

  return (
    <div
      className={styles.Tool}
      role="complementary"
      aria-label="주문 금액 정보"
    >
      <div className={styles.TotalPrice} role="region" aria-label="결제 정보">
        {returnPolicy.map(({ title, content }) => (
          <TopPriceWrap.PriceInfo key={title} title={title} content={content} />
        ))}
        <TopPriceWrap.OrderButton
          isDataEmpty={isDataEmpty}
          onClick={handleOrder}
          data={data}
          state={total}
        />
      </div>
    </div>
  );
};

// 서브 컴포넌트 정의

// 상품 금액 정보
TopPriceWrap.PriceInfo = ({ title, content }) => (
  <Info
    InfoTitle={title}
    InfoContents={content}
    name={"정보란"}
    className={styles.InfoWrap}
  />
);

// 주문하기 버튼
TopPriceWrap.OrderButton = ({ isDataEmpty, onClick, data, state }) => (
  <button
    onClick={onClick}
    className={`${styles.OrderBtn} ${isDataEmpty ? styles.DisabledBtn : ""}`}
    disabled={isDataEmpty}
    aria-label={`주문하기 (${data.length}개 상품)`}
    aria-disabled={isDataEmpty}
  >
    <Info
      className={styles.InfoTool}
      name="결제금액"
      InfoTitle={<span>주문하기</span>}
      InfoContents={<span>{state}</span>}
    />
  </button>
);

// displayName 설정
TopPriceWrap.PriceInfo.displayName = " TopPriceWrap.PriceInfo";
TopPriceWrap.OrderButton.displayName = " TopPriceWrap.OrderButton";

export default TopPriceWrap;
