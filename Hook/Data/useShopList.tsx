import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import { useErrorModal } from "./useError";

import { KakaoBookSearch } from "@/data/BookApi";
import { ReadSupaBase, DeleteSupaBase } from "@/data/supabase";
import { BookDataType } from "@/types";
import { LoadingAtom } from "@/components/Recoil/Loading/atom";
import { OnOffModal } from "@/components/Recoil/Modal/OnOffModal/atom";

/**
 * `useShopList` 훅은 장바구니(또는 구매 목록)에 대한 데이터를 관리하는 훅입니다.
 * - Supabase에서 데이터를 불러오고,
 * - Kakao API를 통해 책 정보를 검색하며,
 * - 수량 변경, 삭제 등의 기능을 포함합니다.
 */
export function useShopList() {
  const [shopList, setShopList] = useState<BookDataType[]>([]); // 책 목록 상태
  const [numbers, setNumbers] = useState<{ [key: string]: number }>({}); // 책 제목별 수량 상태
  const [modal] = useRecoilState(OnOffModal); // 모달 상태 (예: 상품 추가/존재)
  const [loading, setLoading] = useRecoilState(LoadingAtom); // 로딩 상태
  const { openError } = useErrorModal();
  const [isFetched, setIsFetched] = useState(false); // ✅ 추가

  /**
   * Supabase에서 데이터를 불러오고, Kakao API를 통해 책 정보를 검색합니다.
   * 책의 ID, 제목, 수량을 매핑하여 `shopList` 상태로 설정합니다.
   */
  const fetchBooks = async () => {
    try {
      setLoading((prev) => ({ ...prev, isOpen: true }));
      const result = await ReadSupaBase();

      const DataId = result.data
        .map((item) => item.id)
        .filter((num): num is number => num !== undefined);

      const searchQueries = result.data.map((item) => item.title);

      const numberingList = result.data
        .map((item) => item.numbering)
        .filter((num): num is number => num !== undefined);

      // 책 제목들로 Kakao API 호출
      const searchResults = await Promise.allSettled(
        searchQueries.map((query) => KakaoBookSearch(query))
      );

      // 성공한 결과만 추려서 정리
      const successfulResults = searchResults
        .map((result, index) => {
          if (result.status === "fulfilled") {
            return {
              id: DataId[index] ?? null,
              data: result.value[0], // Kakao API 결과
              title: searchQueries[index],
              numbering: numberingList[index] ?? null,
            };
          }

          return null;
        })
        .filter((result) => result !== null) as {
        data: BookDataType;
        title: string;
        id: number;
        numbering: number | null;
      }[];

      // shopList 상태 업데이트
      setShopList(
        successfulResults.map((item) => ({
          ...item.data,
          id: item.id ?? undefined,
          numbering: item.numbering ?? undefined,
        }))
      );
      setIsFetched(true); // ✅ fetch 끝날 때 true

      setLoading((prev) => ({ ...prev, isOpen: false }));
    } catch (error) {
      openError("DataError");
      setIsFetched(true); // ❗️에러가 나도 fetch 시도는 끝났다는 의미로 true 처리
    }
  };

  /**
   * 상품 추가/존재 모달이 열릴 때마다 상품 데이터를 새로 불러옵니다.
   */
  useEffect(() => {
    fetchBooks();
  }, [modal.type === "ProductShopExists", modal.type === "ProductShopAdd"]);

  /**
   * shopList가 있을 때, 각 책 제목에 대한 기본 수량을 설정합니다.
   */
  useEffect(() => {
    if (shopList.length > 0 && Object.keys(numbers).length === 0) {
      setNumbers(
        Object.fromEntries(
          shopList.map((book) => [book.title, book.numbering ?? 1])
        )
      );
    }
  }, [shopList]);

  /**
   * numbers 상태가 바뀌면 shopList의 수량도 동기화합니다.
   */
  const syncNumbersToShopList = () => {
    setShopList((prev) =>
      prev.map((book) => ({
        ...book,
        numbering: numbers[book.title] ?? 1,
      }))
    );
  };

  useEffect(() => {
    if (Object.keys(numbers).length > 0) {
      syncNumbersToShopList();
    }
  }, [numbers]);

  // ✅ 외부로 내보낼 함수들

  /**
   * 특정 책 제목의 수량을 1 증가시킵니다.
   */
  const handleIncrease = (title: string) => {
    setNumbers((prev) => ({
      ...prev,
      [title]: (prev[title] ?? 0) + 1,
    }));
  };

  /**
   * 특정 책 제목의 수량을 1 감소시키며, 최소값은 1입니다.
   */
  const handleDecrease = (title: string) => {
    setNumbers((prev) => ({
      ...prev,
      [title]: Math.max((prev[title] ?? 0) - 1, 1),
    }));
  };

  /**
   * 특정 책을 shopList에서 제거하고, Supabase에서도 삭제합니다.
   */
  const handleDelete = async (id: number | undefined) => {
    if (id === undefined) return;
    setShopList((prev) => prev.filter((item) => item.id !== id));
    await DeleteSupaBase(id);
  };

  // 리턴: 훅에서 사용할 상태 및 메서드들
  return {
    loading,
    shopList,
    setShopList,
    numbers,
    setNumbers,
    handleIncrease,
    handleDecrease,
    handleDelete,
    isFetched,
  };
}
