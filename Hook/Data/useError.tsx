// src/hooks/useErrorModal.ts
import { useRecoilState } from "recoil";

import { ErrorModal } from "@/components/Recoil/Modal/ErrorModal/atom";

/**
 * useErrorModal 훅은 전역 에러 모달을 제어하기 위한 커스텀 훅입니다.
 * 컴포넌트나 훅에서 쉽게 에러 모달을 열 수 있도록 추상화되어 있습니다.
 *
 * @returns {Object} openError - 특정 에러 타입을 받아 전역 에러 모달을 엽니다.
 */
export function useErrorModal() {
  const [, setModal] = useRecoilState(ErrorModal);

  /**
   * 전역 에러 모달을 열어줍니다.
   *
   * @param {"DataError" | "DeleteError" | "RefError"} type
   * - "DataError" : 데이터 처리 오류 (예: DB 실패, 파싱 오류 등)
   * - "DeleteError" : 삭제 오류
   * - "RefError" : 그냥 오류류
   */
  const openError = (type: "DataError" | "DeleteError" | "RefError") => {
    setModal({ isOpen: true, type });
  };

  return {
    openError,
  };
}
