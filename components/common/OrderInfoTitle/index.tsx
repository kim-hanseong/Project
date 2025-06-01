import styles from "./index.module.css";

import FlexBox from "@/components/common/FlexBox";
import TitleTag from "@/components/common/TitleTag";
import Info from "@/components/common/Info";

interface PaginationItem {
  page: string;
  index: number;
}
interface Props {
  TitleIndex: number;
}

const OrderInfoTitle = ({ TitleIndex }: Props) => {
  const pages: PaginationItem[] = [
    { page: "장바구니", index: 1 },
    { page: "주문/결제", index: 2 },
    { page: "주문완료", index: 3 },
  ];
  const currentPage = pages.find((item) => item.index === TitleIndex);

  return (
    <div
      className={styles.titleWrap}
      role="navigation"
      aria-label="주문 진행 단계"
    >
      <TitleTag
        classNames={styles.title}
        level={2}
        aria-label={`현재 단계: ${currentPage?.page}`}
      >
        {currentPage?.page ?? null}
      </TitleTag>
      <FlexBox $gap={2} aria-label="주문 단계 목록">
        {pages.map(({ page, index }) => (
          <Info
            key={page}
            InfoTitle={index}
            InfoContents={page}
            name="정보란"
            className={`${styles.FocusInfo} ${
              TitleIndex === index ? styles.ActiveInfo : ""
            }`}
            aria-current={TitleIndex === index ? "step" : undefined}
            aria-label={`${page} 단계 ${TitleIndex === index ? "(현재 단계)" : ""}`}
          />
        ))}
      </FlexBox>
    </div>
  );
};

export default OrderInfoTitle;
