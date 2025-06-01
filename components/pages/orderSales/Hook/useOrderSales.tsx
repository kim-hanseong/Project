import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import { KakaoBookSearch } from "@/data/BookApi";
import { GetBestByNumbering } from "@/data/supabase";
import { BookDataType } from "@/types";
import { LoadingAtom } from "@/components/Recoil/Loading/atom";
import { useErrorModal } from "@/Hook/Data/useError";

/**
 * `useShopList` 훅은 장바구니(또는 구매 목록)에 대한 데이터를 관리하는 훅입니다.
 * - Supabase에서 데이터를 불러오고,
 * - Kakao API를 통해 책 정보를 검색하며,
 * - 수량 변경, 삭제 등의 기능을 포함합니다.
 */
export function useOrderSales() {
  const [orderSales, setOrderSales] = useState<BookDataType[]>([]);
  const [loading, setLoading] = useRecoilState(LoadingAtom);
  const { openError } = useErrorModal();

  const fetchBooks = async () => {
    try {
      setLoading((prev) => ({ ...prev, isOpen: true }));
      const result = await GetBestByNumbering();

      if (!result) {
        throw new Error("데이터를 가져오는데 실패했습니다.");
      }

      // 상위 10개만 가져오기
      const top10Books = result.slice(0, 10);
      const searchQueries = top10Books.map((item) => item.title);

      // Kakao API로 책 정보 가져오기
      const searchResults = await Promise.allSettled(
        searchQueries.map((query) => KakaoBookSearch(query))
      );

      // 성공한 결과만 정리
      const successfulResults = searchResults
        .map((result) => {
          if (result.status === "fulfilled") {
            return result.value[0];
          }

          return null;
        })
        .filter((result): result is BookDataType => result !== null);

      setOrderSales(successfulResults);
      setLoading((prev) => ({ ...prev, isOpen: false }));
    } catch (error) {
      openError("DataError");
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return {
    loading,
    orderSales,
  };
}
