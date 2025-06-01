import React from "react";

interface TitleProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6; // level은 1~6의 숫자만 허용
  children: React.ReactNode; // children은 필수
  classNames?: string;
}

/**
 * React 태그로 header 태그를 만들어줍니다
 *
 * @param {number} lever - 태그 되는 h{lever} 레벨입니다.
 * @param {React.ReactNode} children - 모달 내부에 렌더링될 컴포넌트입니다.
 *
 *
 */

const TitleTag: React.FC<TitleProps> = ({
  level = 1,
  children,
  classNames,
}) => {
  // 동적으로 태그 결정
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  // 컴포넌트 렌더링
  return <Tag className={classNames}>{children}</Tag>;
};

export default TitleTag;
