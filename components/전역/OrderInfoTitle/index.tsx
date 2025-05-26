import styles from "./index.module.css";

import FlexBox from "@/components/전역/FlexBox";
import TitleTag from "@/components/전역/TitleTag";
import Info from "@/components/전역/Info";

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
    <div className={styles.titleWrap}>
      <TitleTag classNames={styles.title} level={2}>
        {currentPage?.page ?? null}
      </TitleTag>
      <FlexBox $gap={2}>
        {pages.map(({ page, index }) => (
          <Info
            key={page}
            InfoTitle={index}
            InfoContents={page}
            name="정보란"
            className={`${styles.FocusInfo} ${
              TitleIndex === index ? styles.ActiveInfo : ""
            }`}
          />
        ))}
      </FlexBox>
    </div>
  );
};

export default OrderInfoTitle;
