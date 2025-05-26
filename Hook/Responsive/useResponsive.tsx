import { useState, useEffect } from "react";

/**
 * 일정 크기 이하로 내려가면 다른 컴포넌트로 대체할 수 있게 만들어 줍니다
 *
 * @param {(breackPoint)} breackPoint -- 다른 컴포넌트로 대체할 크기의 px 입니다.
 *
 */

//* Hook : Responsive Break ## *
export const useResponsive = (breakpoint: number) => {
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= breakpoint);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isLargeScreen;
};
