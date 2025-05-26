import { useEffect } from "react";

import { useLoginCheck } from "./useUserCheck";

/**
 * useMountLoginCheck 훅은 페이지가 오픈 되자마자 로그인을 확인하는 훅 입니다.
 *
 */

export const useMountLoginCheck = () => {
  const { checkLogin } = useLoginCheck(); // 여기서 먼저 훅 호출

  useEffect(() => {
    checkLogin(); // 그리고 이 안에서 함수 실행
  }, []);
};
