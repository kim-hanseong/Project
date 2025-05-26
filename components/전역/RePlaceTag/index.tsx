import React from "react";

import styles from "@/components/전역/RePlaceTag/index.module.css";

interface RePlaceProps {
  children: React.ReactNode; // children은 필수
  className?: string;
}

/**
 * React 태그로 대체 컴포넌트를 만듭니다.
 * 기본 class 를 가지고 있으며 다른 class 를 원할시 인수로 받아 사용할 수 있습니다
 *
 * @param {React.ReactNode} children - 모달 내부에 렌더링될 컴포넌트입니다.
 * @param {string} [className] - 추가로 적용할 클래스 이름입니다.
 */
const RePlaceTag: React.FC<RePlaceProps> = ({ children, className }) => {
  const combinedClassName = className || styles.RePlace; // className이 있으면 사용, 없으면 styles.RePlace

  return <div className={combinedClassName}>{children}</div>;
};

export default RePlaceTag;
