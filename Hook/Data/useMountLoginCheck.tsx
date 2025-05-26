import { useEffect } from "react";
import { useLoginCheck } from "./useUserCheck";

/**
 * useMountLoginCheck 훅은 페이지가 오픈 되자마자 로그인을 확인하는 훅입니다.
 * 로그인이 필요한 페이지에서 사용됩니다.
 */
export const useMountLoginCheck = () => {
  const { checkLogin } = useLoginCheck();

  useEffect(() => {
    checkLogin(); // 마운트 시 한 번만 실행
  }, []); // 의존성 배열 비움
};
