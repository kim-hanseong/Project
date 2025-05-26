import styles from "./index.module.css";

import FlexBox from "@/components/전역/FlexBox";
import TitleTag from "@/components/전역/TitleTag";

const MainHero: React.FC & {
  Title: React.FC;
  Slide: React.FC;
} = () => {
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroContainer}>
        <FlexBox $col={true}>
          <MainHero.Title />
          <MainHero.Slide />
        </FlexBox>
      </div>
    </section>
  );
};

MainHero.Title = () => (
  <div className={styles.heroTitle}>
    <TitleTag level={2}>
      새로운 책 <b>Books</b> 에서 찾아보세요
    </TitleTag>
  </div>
);

MainHero.Slide = () => (
  <div className={styles.slidesWrapper}>
    <div role="img" aria-label="도서 슬라이드 1" />
    <div role="img" aria-label="도서 슬라이드 2" />
    <div role="img" aria-label="도서 슬라이드 3" />
  </div>
);

// MainHero.displayName = "MainHeroTitle";
MainHero.Title.displayName = "MainHero.Title";
MainHero.Slide.displayName = "MainHero.Slide";

export default MainHero;
