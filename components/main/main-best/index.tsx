// MainBestSlide 컴포넌트
import type { Swiper as SwiperType } from "swiper";

//* Hook import *
import { useCallback, useRef, useState, MutableRefObject } from "react";
import { FaPlus, FaChevronLeft, FaChevronRight, FaFire } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import styles from "./index.module.css";

import FlexBox from "@/components/전역/FlexBox";
//* Product Component import *
import { Thumbnail } from "@/container/product/Thumbnail";
import { Title } from "@/container/product/Title";
import { Authors } from "@/container/product/Authors";
import { CustomPrice } from "@/container/product/Price";
//* Style import *
//* Type import *
import { BookDataType } from "@/types";
import LinkIcon from "@/components/전역/Link-Icons";

//* Props 타입 정의
interface SimilarProductPostProps {
  data: BookDataType[] | null;
  name: string;
  onCategoryChange: (category: string) => void;
  currentCategory?: string;
  loading: boolean;
  mode: "best" | "top";
}

interface CategoryItem {
  title: string;
}

const CATEGORY_LIST = [
  { title: "전체" },
  { title: "국내도서" },
  { title: "외국도서" },
  { title: "eBook" },
];

interface ModeTitleProps {
  mode: "best" | "top";
}

// MainBestSlide 메인 컴포넌트 정의
const MainBestSlide: React.FC<SimilarProductPostProps> & {
  Container: React.FC<{ children: React.ReactNode }>;
  Category: React.FC<{
    categoryList: CategoryItem[];
    handleCategoryChange: (category: string) => void;
    currentCategory?: string;
  }>;
  MoreView: React.FC<{ mode: string }>;
  SlideWrapper: React.FC<{ children: React.ReactNode }>;
  Slide: React.FC<{
    book: BookDataType[];
    swiperRef: MutableRefObject<SwiperType | null>;
    onSlideChange: (swiper: SwiperType) => void;
  }>;
  SlideItem: React.FC<{ book: BookDataType }>;
  EmotySlide: React.FC;
  SlideItemEmpty: React.FC;
} = ({ data, onCategoryChange, currentCategory = "전체", loading, mode }) => {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const swiperRef = useRef<SwiperType | null>(
    null
  ) as MutableRefObject<SwiperType | null>;

  const handleCategoryChange = useCallback(
    (category: string) => {
      onCategoryChange(category);
    },
    [onCategoryChange]
  );

  const handlePrev = () => {
    if (swiperRef.current && !isBeginning) {
      swiperRef.current.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current && !isEnd) {
      swiperRef.current.slideNext();
    }
  };

  const SlideContent =
    loading || !data || data.length === 0 ? (
      <MainBestSlide.EmotySlide />
    ) : (
      <MainBestSlide.Slide
        book={data}
        swiperRef={swiperRef}
        onSlideChange={(swiper) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
      />
    );

  const ModeTitle: React.FC<ModeTitleProps> = ({ mode }) => {
    switch (mode) {
      case "best":
        return <BestTitle />;
      case "top":
        return <TopTitle />;
      default:
        return null;
    }
  };

  return (
    <MainBestSlide.Container>
      <MainBestSlide.SlideWrapper>
        <ModeTitle mode={mode} />
        <FlexBox $justify="space-between" className={styles.flexWrapper}>
          <div className={styles.categoryWrapper}>
            {mode === "best" && (
              <MainBestSlide.Category
                categoryList={CATEGORY_LIST}
                handleCategoryChange={handleCategoryChange}
                currentCategory={currentCategory}
              />
            )}
          </div>
          <MainBestSlide.MoreView mode={mode} />
        </FlexBox>
        {SlideContent}
        <button
          className={`${styles.slideNavigation} ${styles.prev} ${isBeginning ? styles.disabled : ""}`}
          onClick={handlePrev}
          aria-label="이전 슬라이드"
        >
          <FaChevronLeft />
        </button>
        <button
          className={`${styles.slideNavigation} ${styles.next} ${isEnd ? styles.disabled : ""}`}
          onClick={handleNext}
          aria-label="다음 슬라이드"
        >
          <FaChevronRight />
        </button>
      </MainBestSlide.SlideWrapper>
    </MainBestSlide.Container>
  );
};

//* 서브 컴포넌트들 정의
MainBestSlide.Container = ({ children }) => (
  <div className={styles.slmilarTool}>{children}</div>
);

const BestTitle = () => (
  <p className={styles.bestTitle}>이 분야의 베스트셀러</p>
);

const TopTitle = () => (
  <div className={styles.titleContainer}>
    <div className={styles.titleWrapper}>
      <FaFire className={styles.fireIcon} />
      <h2 className={styles.title}>판매량 순</h2>
    </div>
    <p className={styles.subtitle}>가장 많이 판매된 도서 TOP 10</p>
  </div>
);

MainBestSlide.Category = ({
  categoryList,
  handleCategoryChange,
  currentCategory,
}) => (
  <ul className={styles.SizeTool}>
    {categoryList.map((option) => (
      <li key={option.title} className={styles.Item}>
        <button
          className={`${styles.btn} ${option.title === currentCategory ? styles.active : ""}`}
          onClick={() => handleCategoryChange(option.title)}
        >
          {option.title}
        </button>
      </li>
    ))}
  </ul>
);
MainBestSlide.MoreView = ({ mode }) => (
  <LinkIcon
    className={styles.moreViewButton}
    value={mode === "best" ? "베스트셀러 더보기" : "판매량 순 더보기"}
    ButtonIcons={
      <button className={styles.moreViewButtonInner}>
        <span>더 보기</span>
        <FaPlus className={styles.moreViewIcon} />
      </button>
    }
    Href={mode === "best" ? "/bestseller" : "/orderSales"}
  />
);
MainBestSlide.SlideWrapper = ({ children }) => <div>{children}</div>;

MainBestSlide.Slide = ({ book, swiperRef, onSlideChange }) => (
  <Swiper
    onSwiper={(swiper: SwiperType) => {
      swiperRef.current = swiper;
    }}
    onSlideChange={onSlideChange}
    loop={true}
    spaceBetween={50}
    breakpoints={{
      0: { slidesPerView: 2 },
      560: { slidesPerView: 3 },
      760: { slidesPerView: 4 },
      960: { slidesPerView: 5 },
    }}
    autoplay={{
      delay: 2500,
      disableOnInteraction: false,
    }}
    scrollbar={{
      draggable: true,
      hide: false,
      snapOnRelease: true,
    }}
  >
    {book.map((slide, index) => (
      <SwiperSlide key={index} className={styles.sliderSlide}>
        <MainBestSlide.SlideItem book={slide} />
      </SwiperSlide>
    ))}
  </Swiper>
);

MainBestSlide.SlideItem = ({ book }) => (
  <FlexBox $col={true} $gap={3} className={styles.test}>
    <Thumbnail data={book} className={styles.sliderthumbnail} />
    <Title data={book} className={styles.slidertitle} />
    <Authors data={book} className={styles.sliderauthors} />
    <CustomPrice
      data={book}
      Tool={styles.PriceTool}
      DisCount={styles.PricePercentage}
      SalePrice={styles.Price}
      Price={styles.SalePrice}
    />
  </FlexBox>
);

MainBestSlide.EmotySlide = () => (
  <Swiper
    loop={true}
    spaceBetween={50}
    breakpoints={{
      0: { slidesPerView: 2 },
      560: { slidesPerView: 3 },
      760: { slidesPerView: 4 },
      960: { slidesPerView: 5 },
    }}
    autoplay={{
      delay: 2500,
      disableOnInteraction: false,
    }}
    scrollbar={{
      draggable: true,
      hide: false,
      snapOnRelease: true,
    }}
  >
    {[...Array(5)].map((_, index) => (
      <SwiperSlide key={index} className={styles.sliderSlide}>
        <Thumbnail className={styles.sliderthumbnail} />
      </SwiperSlide>
    ))}
  </Swiper>
);

MainBestSlide.SlideItemEmpty = () => (
  <Thumbnail className={styles.sliderthumbnail} />
);

//* displayName 설정
MainBestSlide.Container.displayName = "MainBestSlide.Container";
MainBestSlide.Category.displayName = "MainBestSlide.Category";
MainBestSlide.MoreView.displayName = "MainBestSlide.MoreView";
MainBestSlide.SlideWrapper.displayName = "MainBestSlide.SlideWrapper";
MainBestSlide.Slide.displayName = "MainBestSlide.SlideItem";
MainBestSlide.SlideItem.displayName = "MainBestSlide.SlideItem";
MainBestSlide.EmotySlide.displayName = "MainBestSlide.EmotySlide";
MainBestSlide.SlideItemEmpty.displayName = "MainBestSlide.SlideItemEmpty";

export default MainBestSlide;
