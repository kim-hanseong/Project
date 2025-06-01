import { useEffect, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";

import styles from "./index.module.css";

//* 컴포넌트 import *
import Info from "@/components/common/Info";
import { SyncShopData } from "@/data/supabase";
import { BookDataType } from "@/types";

interface ProductProps {
  data: BookDataType[];
  state: Record<string, number>;
}

//   MobilePriceWrap 컴포넌트
const MobilePriceWrap: React.FC<ProductProps> & {
  PriceInfo: React.FC<{ title: string; content: string }>;
  OrderButton: React.FC<{
    isDataEmpty: boolean;
    onClick: () => void;
    data: BookDataType[];
    state: Record<string, number>;
  }>;
} = ({ data, state }) => {
  const router = useRouter();
  const pathname = usePathname(); // 현재 경로 가져오기

  // 주문 처리 함수
  const handleOrder = async () => {
    await SyncShopData(data);
    if (pathname === "/order") {
      router.push("/order-end");
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

  // 데이터가 비었는지 확인
  const isDataEmpty = data.length === 0;

  // 상품 총 금액 계산
  const returnPolicy = useMemo(
    () => [
      {
        title: "상품 총 금액",
        content: `: ${data
          .reduce(
            (total, book) => total + (state[book.title] ?? 1) * book.sale_price,
            0
          )
          .toLocaleString()}원`,
      },
      // ...
    ],
    [data, state]
  );

  return (
    <div className={styles.Tool}>
      <div className={styles.TotalPrice}>
        {returnPolicy.map(({ title, content }) => (
          <MobilePriceWrap.PriceInfo
            key={title}
            title={title}
            content={content}
          />
        ))}
        <MobilePriceWrap.OrderButton
          isDataEmpty={isDataEmpty}
          onClick={handleOrder}
          data={data}
          state={state}
        />
      </div>
    </div>
  );
};

// 서브 컴포넌트 정의

// 상품 금액 정보
MobilePriceWrap.PriceInfo = ({ title, content }) => (
  <Info
    InfoTitle={title}
    InfoContents={content}
    name={"정보란"}
    className={styles.InfoWrap}
  />
);

// 주문하기 버튼
MobilePriceWrap.OrderButton = ({ isDataEmpty, onClick, data, state }) => (
  <button
    onClick={onClick}
    className={`${styles.OrderBtn} ${isDataEmpty ? styles.DisabledBtn : ""}`}
    disabled={isDataEmpty}
  >
    <Info
      className={styles.InfoTool}
      name="결제금액"
      InfoTitle={<span>주문하기</span>}
      InfoContents={
        <span>
          (
          {isDataEmpty
            ? "0"
            : data.reduce((total, book) => total + (state[book.title] ?? 1), 0)}
          )
        </span>
      }
    />
  </button>
);

// displayName 설정
MobilePriceWrap.PriceInfo.displayName = "  MobilePriceWrap.PriceInfo";
MobilePriceWrap.OrderButton.displayName = "  MobilePriceWrap.OrderButton";

export default MobilePriceWrap;
