"use client";
import FooterIntro from "./Footer-Intro";
import FooterInfo from "./Footer-Info";
import FooterCustom from "./Footer-Customer";

import Component from "@/components/전역/컴포넌트구별/Component";
import FlexBox from "@/components/전역/FlexBox";
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
    <footer>
      <Component className={styles.Footer}>
        <div className={styles.Component}>
          <h1 className={styles.Header}>Books</h1>
          <FlexBox $justify="space-between" $col={true}>
            <FlexBox $col={true} $justify="space-between">
              <FooterInfo categoryList={COMPANY_INFO} />
              <FooterIntro categoryList={COMPANY_INTRO} />
            </FlexBox>
            <FooterCustom />
          </FlexBox>
        </div>
      </Component>
    </footer>
  );
};

export default FooterComponent;
