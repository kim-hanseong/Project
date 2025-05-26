import React from "react";

/**
 * NavBar 컴포넌트를 분리시켜놓는 컴포넌트입니다.
 *
 * @param {React.ReactNode} children - 여러 컴포넌트를 자식으로 받아줍니다.
 * @param {string} [className] - 추가적인 클래스명을 지정할 수 있습니다.
 *
 */

const NavBarComponent: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return <div className={className}>{children}</div>;
};

export default NavBarComponent;
