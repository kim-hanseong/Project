// FocusSimilarBookSlide 컴포넌트
//* Hook import *
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

//* Product Component import *
import { Thumbnail } from "@/components/common/product/Thumbnail";
import { Title } from "@/components/common/product/Title";
import { Authors } from "@/components/common/product/Authors";
import { CustomPrice } from "@/components/common/product/Price";
import FlexBox from "@/components/common/FlexBox";
import styles from "./index.module.css";
//* Style import *
//* Type import *
import { BookDataType } from "@/types";

//* Props 타입 정의
interface SimilarProductPostProps {
  data: BookDataType[] | null;
  name: string;
}

// FocusSimilarBookSlide 메인 컴포넌트 정의
const FocusSimilarBookSlide: React.FC<SimilarProductPostProps> & {
  Container: React.FC<{ children: React.ReactNode }>;
  Title: React.FC;
  SlideWrapper: React.FC<{ children: React.ReactNode }>;
  SlideItem: React.FC<{ slide: BookDataType }>;
} = ({ data }) => {
  return (
    <FocusSimilarBookSlide.Container>
      {data && data.length > 1 && (
        <FocusSimilarBookSlide.SlideWrapper>
          <FocusSimilarBookSlide.Title />
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
            role="region"
            aria-label="추천 도서 슬라이더"
          >
            {data.slice(1, 10).map((slide, index) => (
              <SwiperSlide
                key={index}
                className={styles.sliderSlide}
                role="group"
                aria-label={`추천 도서 ${index + 1}`}
              >
                <FocusSimilarBookSlide.SlideItem slide={slide} />
              </SwiperSlide>
            ))}
          </Swiper>
        </FocusSimilarBookSlide.SlideWrapper>
      )}
    </FocusSimilarBookSlide.Container>
  );
};

//* 서브 컴포넌트들 정의
FocusSimilarBookSlide.Container = ({ children }) => (
  <div
    className={styles.slmilarTool}
    role="complementary"
    aria-label="추천 도서"
  >
    {children}
  </div>
);

FocusSimilarBookSlide.Title = () => (
  <p id="similar-books-heading" className={styles.similartitle}>
    이 분야의 베스트셀러
  </p>
);

FocusSimilarBookSlide.SlideWrapper = ({ children }) => (
  <div role="region" aria-labelledby="similar-books-heading">
    {children}
  </div>
);

FocusSimilarBookSlide.SlideItem = ({ slide }) => (
  <FlexBox $col={true} $gap={3} className={styles.test} role="article">
    <Thumbnail
      data={slide}
      className={styles.sliderthumbnail}
      aria-label={`${slide.title} 표지`}
    />
    <Title data={slide} className={styles.slidertitle} />
    <Authors data={slide} className={styles.sliderauthors} />
    <CustomPrice
      data={slide}
      Tool={styles.PriceTool}
      DisCount={styles.PricePercentage}
      SalePrice={styles.Price}
      Price={styles.SalePrice}
    />
  </FlexBox>
);

//* displayName 설정
FocusSimilarBookSlide.Container.displayName = "FocusSimilarBookSlide.Container";
FocusSimilarBookSlide.Title.displayName = "FocusSimilarBookSlide.Title";
FocusSimilarBookSlide.SlideWrapper.displayName =
  "FocusSimilarBookSlide.SlideWrapper";
FocusSimilarBookSlide.SlideItem.displayName = "FocusSimilarBookSlide.SlideItem";

export default FocusSimilarBookSlide;
