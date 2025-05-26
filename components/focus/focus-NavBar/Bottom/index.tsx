import { useState, useEffect } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

import styles from "@/components/focus/focus-NavBar/Bottom/index.module.css";
import { AddButton } from "@/container/util/Button/AddBtn";
import { BuyButton } from "@/container/util/Button/BuyBtn";
import FlexBox from "@/components/전역/FlexBox";
import Info from "@/components/전역/Info";
import { BookDataType } from "@/types";
import { useFormatPrice } from "@/Hook/Date/useFormatPrice";
interface BookInfoProps {
  data: BookDataType | null;
}

// FocusMobileBottom 컴포넌트
const FocusMobileBottom: React.FC<BookInfoProps> & {
  InfoSection: React.FC<{
    price: number;
  }>;
  IncreaseButton: React.FC<{
    onClick: () => void;
  }>;
  DecreaseButton: React.FC<{
    onClick: () => void;
  }>;
  NumberSelector: React.FC<{
    number: number;
    handleIncrease: () => void;
    handleDecrease: () => void;
  }>;
  ShopButtons: React.FC<{
    data: BookDataType;
    counter: number;
  }>;
} = ({ data }: BookInfoProps) => {
  const [number, setNumber] = useState(1);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    if (data) {
      setPrice(data.sale_price * number);
    }
  }, [number, data]);

  const handleIncrease = () => {
    setNumber((prev) => prev + 1);
  };

  const handleDecrease = () => {
    setNumber((prev) => Math.max(prev - 1, 1));
  };

  if (!data) {
    return null;
  }

  return (
    <div className={styles.BottomContainer}>
      <FlexBox
        $gap={4}
        $align="center"
        $justify="space-between"
        className={styles.BottomFlex}
      >
        <FocusMobileBottom.InfoSection price={price} />
        <FocusMobileBottom.NumberSelector
          number={number}
          handleIncrease={handleIncrease}
          handleDecrease={handleDecrease}
        />
        <FocusMobileBottom.ShopButtons data={data} counter={number} />
      </FlexBox>
    </div>
  );
};

// 서브 컴포넌트 정의

// 상품 가격 정보 섹션
FocusMobileBottom.InfoSection = ({ price }) => (
  <Info
    InfoTitle={<span>총 상품 금액</span>}
    InfoContents={<span>{useFormatPrice(price)}원</span>}
    name={"상품 가격 측정"}
    className={styles.FocusInfo}
  />
);

// 수량 증가 버튼
FocusMobileBottom.IncreaseButton = ({ onClick }) => (
  <button onClick={onClick}>
    <FaPlus />
  </button>
);

// 수량 감소 버튼
FocusMobileBottom.DecreaseButton = ({ onClick }) => (
  <button onClick={onClick}>
    <FaMinus />
  </button>
);

// 수량 조정
FocusMobileBottom.NumberSelector = ({
  number,
  handleIncrease,
  handleDecrease,
}) => (
  <FlexBox $align="center" className={styles.NumberContainer}>
    <FocusMobileBottom.IncreaseButton onClick={handleIncrease} />
    <button>{number}</button>
    <FocusMobileBottom.DecreaseButton onClick={handleDecrease} />
  </FlexBox>
);

// 쇼핑 버튼들 (장바구니, 구매하기)
FocusMobileBottom.ShopButtons = ({ data, counter }) => (
  <FlexBox className={styles.ShopBtn}>
    <AddButton data={data} className={styles.AddBtn} counter={counter} />
    <BuyButton data={data} className={styles.BuyBtn} />
  </FlexBox>
);

FocusMobileBottom.InfoSection.displayName = "FocusMobileBottom.InfoSection";
FocusMobileBottom.IncreaseButton.displayName =
  "FocusMobileBottom.IncreaseButton";
FocusMobileBottom.DecreaseButton.displayName =
  "FocusMobileBottom.DecreaseButton";
FocusMobileBottom.NumberSelector.displayName =
  "FocusMobileBottom.NumberSelector";
FocusMobileBottom.ShopButtons.displayName = "FocusMobileBottom.ShopButtons";

export default FocusMobileBottom;
