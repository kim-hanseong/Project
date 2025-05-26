import { useEffect, useState } from "react";

const useInfiniteScroll = (
  threshold: number,
  callback: () => void,
  maxWidth: number
) => {
  const [hasTriggered, setHasTriggered] = useState(false); // 한 번만 실행되도록 상태 관리
  const [lastScrollTop, setLastScrollTop] = useState(0); // 이전 스크롤 위치 저장

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // 스크롤이 내려갔을 때만 실행되고, threshold 이하로 내려갔을 때 callback 실행
      if (
        documentHeight - (scrollTop + windowHeight) <= threshold &&
        scrollTop > lastScrollTop && // 내려갔을 때만 실행
        !hasTriggered
      ) {
        setHasTriggered(true); // 한 번만 실행되도록 설정
        callback(); // callback 실행

        // 5초 뒤에 hasTriggered 상태를 다시 false로 설정하여 다시 실행되게 함
        setTimeout(() => {
          setHasTriggered(false);
        }, 2000);
      }

      // 현재 스크롤 위치 업데이트
      setLastScrollTop(scrollTop);
    };

    // 화면 크기가 maxWidth 이하일 때만 이벤트 리스너 추가
    const checkWindowSize = () => {
      if (window.innerWidth <= maxWidth) {
        window.addEventListener("scroll", handleScroll);
      } else {
        window.removeEventListener("scroll", handleScroll);
      }
    };

    // 처음에 한 번 실행
    checkWindowSize();

    // 화면 크기 변화에 따라 리스너를 추가/제거하는 효과
    window.addEventListener("resize", checkWindowSize);

    // cleanup 함수
    return () => {
      window.removeEventListener("resize", checkWindowSize);
      window.removeEventListener("scroll", handleScroll); // cleanup
    };
  }, [threshold, callback, maxWidth, hasTriggered, lastScrollTop]); // 의존성 배열
};

export default useInfiniteScroll;
