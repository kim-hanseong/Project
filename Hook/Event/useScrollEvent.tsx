import { useState, useEffect } from "react";

const useScrollNavbar = (threshold: number) => {
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isBgWhite, setIsBgWhite] = useState(false);
  const [isTop, setIsTop] = useState(true); // ✅ 맨 위 여부

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          // ✅ 스크롤 최상단인지 체크
          setIsTop(currentScrollY === 0);

          if (Math.abs(currentScrollY - lastScrollY) > threshold) {
            setIsHidden(currentScrollY > lastScrollY);
            setLastScrollY(currentScrollY);
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    const handleResize = () => {
      setIsBgWhite(window.scrollY > 506);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    handleResize();
    handleScroll(); // ✅ 초기 스크롤 상태 반영

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [lastScrollY, threshold]);

  return { isHidden, isBgWhite, isTop };
};

export default useScrollNavbar;
