import { useRouter } from "next/navigation";

import { ShopDBAdd } from "@/data/supabase";
import { BookDataType } from "@/types";
import { useLoginCheck } from "@/Hook/Data/useUserCheck";

/**
 * 장바구니 결과 알람 입니다 중복과 추가 상태를 보여줍니다
 *
 * @param {boolean} user - 유저임을 확인합니다.
 * @param {handleAddToCart} handleAddToCart - 장바구니 비교 함수입니다.
 * @param {React.ReactNode} setModal - 내부에 추가결과를 보여주는 모달 Recoil 입니다.
 * @param {string} existingItems - 가져온 장바구니 값을 여기에 할당합니다
 *
 */

export const useBuy = () => {
  const { isAuthenticated, checkLogin } = useLoginCheck(); // 로그인 상태 체크 훅 사용
  const router = useRouter();
  //* 알람 : 추가 결과 알람 *

  // 장바구니 추가
  const handleBuyToCart = async (item: BookDataType) => {
    checkLogin();
    if (!isAuthenticated) return;

    await ShopDBAdd(item);
    router.push("/order");
  };

  return { handleBuyToCart };
};
