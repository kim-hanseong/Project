// src/container/Order/hooks/useOrderSubmitEffect.ts
import { useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { useRouter } from "next/navigation";

import { OrderDB, BestUpdate } from "@/data/supabase";
import { ErrorModal } from "@/components/Recoil/Modal/ErrorModal/atom";
import { useShopList } from "@/Hook/Data/useShopList";
import useAddressUserInfo from "@/container/util/Modal/Order/Address/Hook/useAddressInfo";

export default function useOrderSubmitEffect() {
  const { shopList, isFetched } = useShopList();
  const { address } = useAddressUserInfo();
  const [, setErrorModal] = useRecoilState(ErrorModal);
  const hasSubmitted = useRef(false);
  const router = useRouter();

  // 장바구니 비었을 때 튕기기
  useEffect(() => {
    if (!isFetched) return;

    if (shopList.length === 0) {
      alert("장바구니에 상품이 없습니다.");
      router.replace("/cart");
    }
  }, [isFetched, shopList]);

  // 주문 처리
  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();

    try {
      await OrderDB({
        titles: shopList.map((item) => item.title),
        numberings: shopList
          .map((item) => item.numbering)
          .filter((n): n is number => n !== undefined),
        addressName: address[0].Address,
        phoneNumber: address[0].Phone,
      });

      await BestUpdate(shopList);
    } catch (error) {
      setErrorModal({ isOpen: true, type: "DataError" });
    }
  };

  // 조건 만족 시 자동 주문 제출
  useEffect(() => {
    if (hasSubmitted.current) return;

    if (shopList.length > 0 && address.length > 0) {
      handleSubmit();
      hasSubmitted.current = true;
    }
  }, [shopList, address]);

  return {
    handleSubmit,
  };
}
