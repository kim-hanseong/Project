import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";

import { BestCategoryDomesticAdd, BestCategoryEbookAdd } from "@/data/supabase";
import { BookDataType } from "@/types";
import { useLoginCheck } from "@/Hook/Data/useUserCheck";
import { OnOffModal } from "@/components/Recoil/Modal/OnOffModal/atom";

/**
 * 장바구니 결과 알람입니다. 중복과 추가 상태를 보여줍니다.
 *
 * @returns handleAddToCart 함수를 반환합니다.
 */
export const useTest = () => {
  const { isAuthenticated } = useLoginCheck(); // 로그인 상태 체크 훅 사용
  const [, setModal] = useRecoilState(OnOffModal);

  // 장바구니 추가 함수
  const handleAddToCart = async (item: BookDataType) => {
    console.log("전달되는 데이터:", item); // 데이터 확인용 로그

    if (!isAuthenticated) {
      setModal({
        isOpen: true,
        type: "LoginModal",
      });
      return;
    }

    try {
      const result = await BestCategoryDomesticAdd(item);
      console.log("추가 결과:", result); // 결과 확인용 로그

      if (result.error) {
        console.error("장바구니 추가 실패:", result.error);
        setModal({
          isOpen: true,
          type: "DataError",
        });
      } else {
        setModal({
          isOpen: true,
          type: "SuccessModal",
        });
      }
    } catch (error) {
      console.error("장바구니 추가 실패:", error);
      setModal({
        isOpen: true,
        type: "DataError",
      });
    }
  };
  const EBOOKhandleAddToCart = async (item: BookDataType) => {
    console.log("전달되는 데이터:", item); // 데이터 확인용 로그

    if (!isAuthenticated) {
      setModal({
        isOpen: true,
        type: "LoginModal",
      });
      return;
    }

    try {
      const result = await BestCategoryEbookAdd(item);
      console.log("추가 결과:", result); // 결과 확인용 로그

      if (result.error) {
        console.error("장바구니 추가 실패:", result.error);
        setModal({
          isOpen: true,
          type: "DataError",
        });
      } else {
        setModal({
          isOpen: true,
          type: "SuccessModal",
        });
      }
    } catch (error) {
      console.error("장바구니 추가 실패:", error);
      setModal({
        isOpen: true,
        type: "DataError",
      });
    }
  };

  return { handleAddToCart, EBOOKhandleAddToCart };
};
