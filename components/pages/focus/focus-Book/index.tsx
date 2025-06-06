// FocusBookInfo.tsx
import styles from "./index.module.css";

import { Thumbnail } from "@/components/common/product/Thumbnail";
import { Title } from "@/components/common/product/Title";
import { AuthList } from "@/components/common/product/AuthList";
import { CustomPrice } from "@/components/common/product/Price";
import { Isbn } from "@/components/common/product/Isbn";
import Info from "@/components/common/Info";
import { BookDataType } from "@/types";
import FlexBox from "@/components/common/FlexBox";
import { Tag } from "@/components/common/product/Tag";
import { AddButton } from "@/components/common/Button/AddBtn";
import { BuyButton } from "@/components/common/Button/BuyBtn";

interface BookInfoProps {
  data: BookDataType | null;
}

interface InfoListItemProps {
  title: string;
  content: React.ReactNode;
}

// 메인 컴포넌트 정의
const FocusBookInfo: React.FC<BookInfoProps> & {
  Thumbnail: React.FC<{ data: BookDataType }>;
  InfoContainer: React.FC<{ children: React.ReactNode }>;
  TitleAuthorContainer: React.FC<{ data: BookDataType }>;
  PriceInfo: React.FC<{ data: BookDataType }>;
  ExtraInfoList: React.FC<{ data: BookDataType }>;
  ShopBtn: React.FC<{ data: BookDataType }>;
} = ({ data }) => {
  if (!data) {
    return null;
  }

  return (
    <div
      className={styles.bookInfoWrapper}
      aria-label={`${data.title} 도서 상세 정보`}
    >
      <FocusBookInfo.Thumbnail data={data} />
      <FocusBookInfo.InfoContainer>
        <FocusBookInfo.TitleAuthorContainer data={data} />
        <FocusBookInfo.PriceInfo data={data} />
        <FocusBookInfo.ExtraInfoList data={data} />
        <FocusBookInfo.ShopBtn data={data} />
      </FocusBookInfo.InfoContainer>
    </div>
  );
};

// 개별 서브 컴포넌트 정의
FocusBookInfo.Thumbnail = ({ data }) => (
  <div
    className={styles.thumbnailContainer}
    style={{ "--bg-url": `url(${data.thumbnail})` } as React.CSSProperties}
    role="img"
  >
    <Thumbnail data={data} className={styles.thumbnail} />
  </div>
);

FocusBookInfo.InfoContainer = ({ children }) => (
  <FlexBox
    $col={true}
    $justify="space-between"
    className={styles.infoContainer}
  >
    {children}
  </FlexBox>
);

FocusBookInfo.TitleAuthorContainer = ({ data }) => (
  <FlexBox $col={true}>
    <Tag data={data} className={styles.tag} />
    <FlexBox $col={true}>
      <Title data={data} className={styles.title} />
      <AuthList data={data} className={styles.authors} />
    </FlexBox>
  </FlexBox>
);

FocusBookInfo.PriceInfo = ({ data }) => (
  <div role="contentinfo" aria-label="도서 가격 정보">
    <CustomPrice
      Tool={styles.priceWrapper}
      DisCount={styles.discountRate}
      SalePrice={styles.discountedPrice}
      Price={styles.originalPrice}
      data={data}
    />
  </div>
);

FocusBookInfo.ExtraInfoList = ({ data }) => {
  const INFO_LIST: InfoListItemProps[] = [
    { title: "신규회원 혜택", content: "2000원 할인" },
    {
      title: "책 ISBN",
      content: <Isbn data={data} className={styles.subTitle} />,
    },
    { title: "배송비", content: "무료" },
    {
      title: "택배배송 날짜",
      content: <span className={styles.subTitle}>오늘배송</span>,
    },
  ];

  return (
    <FlexBox $col={true} $gap={6}>
      {INFO_LIST.map(({ title, content }) => (
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

FocusBookInfo.ShopBtn = ({ data }) => {
  return (
    <FlexBox
      key={data.id}
      $justify="space-between"
      $align="center"
      $gap={4}
      className={styles.InfoTool}
    >
      <AddButton data={data} className={styles.AddBtn} />
      <BuyButton data={data} className={styles.BuyBtn} />
    </FlexBox>
  );
};

// displayName 설정
FocusBookInfo.displayName = "FocusBookInfo";
FocusBookInfo.Thumbnail.displayName = "FocusBookInfo.Thumbnail";
FocusBookInfo.InfoContainer.displayName = "FocusBookInfo.InfoContainer";
FocusBookInfo.TitleAuthorContainer.displayName =
  "FocusBookInfo.TitleAuthorContainer";
FocusBookInfo.PriceInfo.displayName = "FocusBookInfo.PriceInfo";
FocusBookInfo.ExtraInfoList.displayName = "FocusBookInfo.ExtraInfoList";
FocusBookInfo.ShopBtn.displayName = "FocusBookInfo.ShopBtn";

export default FocusBookInfo;
