"use client";
import FooterIntro from "./Footer-Intro";
import FooterInfo from "./Footer-Info";
import FooterCustom from "./Footer-Customer";

import Component from "@/components/common/컴포넌트구별/Component";
import FlexBox from "@/components/common/FlexBox";
import styles from "@/components/layout/Footer/index.module.css";

const FooterComponent = () => {
  const COMPANY_INFO = [
    { title: "(주)한성북센" },
    { title: "대표: 김한성" },
    { title: "주소 : 경기도 시흥시" },
    { title: "개인정보 보호자" },
  ];
  const COMPANY_INTRO = [
    { title: "회사소개" },
    { title: "이용약관" },
    { title: "개인정보처리방침" },
    { title: "Books 서점" },
  ];

  return (
    <footer aria-label="사이트 푸터" role="contentinfo">
      <Component className={styles.Footer}>
        <div className={styles.Component}>
          <h1 className={styles.Header} aria-label="Books 서점">
            Books
          </h1>
          <FlexBox $justify="space-between" $col={true}>
            <FlexBox
              $col={true}
              $justify="space-between"
              aria-label="회사 정보 및 이용약관"
            >
              <FooterInfo categoryList={COMPANY_INFO} aria-label="회사 정보" />
              <FooterIntro
                categoryList={COMPANY_INTRO}
                aria-label="이용약관 및 정책"
              />
            </FlexBox>
            <FooterCustom aria-label="고객 서비스" />
          </FlexBox>
        </div>
      </Component>
    </footer>
  );
};

export default FooterComponent;
