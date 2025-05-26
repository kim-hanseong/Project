import { useRecoilState } from "recoil";

import { useAuth } from "@/components/layout/User";
import { OnOffModal } from "@/components/Recoil/Modal/OnOffModal/atom";

/**
 * 로그인 상태를 확인하고 로그인 알림 상태를 업데이트하는 훅
 *
 * @returns {boolean} isAuthenticated - 사용자가 로그인했는지 여부를 반환합니다.
 * @returns {() => boolean} checkLogin - 로그인 상태를 확인하고 알림을 설정하는 함수입니다.
 */
export const useLoginCheck = () => {
  const { user } = useAuth(); // 유저 상태 확인
  const [, setLoginCheckAralm] = useRecoilState(OnOffModal); // 알람 상태 업데이트

  /**
   * 로그인 여부를 확인하고 알림 상태를 설정하는 함수
   * @returns {boolean} - 로그인 상태 (true: 로그인, false: 비로그인)
   */
  const checkLogin = () => {
    if (!user) {
      setLoginCheckAralm(() => ({
        isOpen: true,
        type: "LoginModal",
      })); // 함수형 업데이트 사용
    }
  };

  return { isAuthenticated: !!user, checkLogin };
};
