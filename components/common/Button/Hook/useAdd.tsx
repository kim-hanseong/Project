import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";

import { ReadSupaBase, ShopDBAdd } from "@/data/supabase";
import { BookDataType } from "@/types";
import { useLoginCheck } from "@/Hook/Data/useUserCheck";
import { OnOffModal } from "@/components/Recoil/Modal/OnOffModal/atom";
import { useErrorModal } from "@/Hook/Data/useError";

/**
 * 장바구니 결과 알람 입니다 중복과 추가 상태를 보여줍니다
 *
 * @param {boolean} user - 유저임을 확인합니다.
 * @param {handleAddToCart} handleAddToCart - 장바구니 비교 함수입니다.
 * @param {React.ReactNode} setModal - 내부에 추가결과를 보여주는 모달 Recoil 입니다.
 * @param {string} existingItems - 가져온 장바구니 값을 여기에 할당합니다
 *
 */

export const useAdd = () => {
  const { isAuthenticated, checkLogin } = useLoginCheck(); // 로그인 상태 체크 훅 사용

  //* 알람 : 추가 결과 알람 *
  const [, setModal] = useRecoilState(OnOffModal);
  const [existingItems, setExistingItems] = useState<BookDataType[]>([]);
  const { openError } = useErrorModal();

  // 장바구니 데이터 로드
  const fetchNumberingData = async () => {
    try {
      const { data: numberingData } = await ReadSupaBase();

      setExistingItems(numberingData);
    } catch (error) {
      openError("DataError");
    }
  };

  useEffect(() => {
    fetchNumberingData();
  }, []);

  // 장바구니 추가
  const handleAddToCart = async (item: BookDataType) => {
    checkLogin();
    if (!isAuthenticated) return;

    const duplicateItem = existingItems.find(
      (existingItem) => existingItem.thumbnail === item.thumbnail
    );

    if (duplicateItem) {
      // 이미 장바구니에 있는 경우 numbering을 증가시키고 업데이트
      const updatedItems = existingItems.map((existingItem) =>
        existingItem.thumbnail === item.thumbnail
          ? { ...existingItem, numbering: (existingItem.numbering ?? 1) + 1 }
          : existingItem
      );

      setExistingItems(updatedItems);
      setModal({ isOpen: true, type: "ProductShopExists" });
      await ShopDBAdd(item);
    } else {
      // 장바구니에 추가되지 않은 경우
      setModal({ isOpen: true, type: "ProductShopAdd" });
      setExistingItems((prevItems) => [...prevItems, item]);
      await ShopDBAdd(item);
    }
  };

  return { existingItems, handleAddToCart, fetchNumberingData };
};
