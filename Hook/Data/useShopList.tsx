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
  const [shopList, setShopList] = useState<BookDataType[]>([]);
  const [numbers, setNumbers] = useState<{ [key: number]: number }>({}); // ✅ id 기반으로 변경
  const [modal] = useRecoilState(OnOffModal);
  const [loading, setLoading] = useRecoilState(LoadingAtom);
  const { openError } = useErrorModal();
  const [isFetched, setIsFetched] = useState(false);

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

      const searchResults = await Promise.allSettled(
        searchQueries.map((query) => KakaoBookSearch(query))
      );

      const successfulResults = searchResults
        .map((result, index) => {
          if (result.status === "fulfilled") {
            return {
              id: DataId[index] ?? null,
              data: result.value[0],
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

      setShopList(
        successfulResults.map((item) => ({
          ...item.data,
          id: item.id ?? undefined,
          numbering: item.numbering ?? undefined,
        }))
      );
      setIsFetched(true);
      setLoading((prev) => ({ ...prev, isOpen: false }));
    } catch (error) {
      openError("DataError");
      setIsFetched(true);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [modal.type === "ProductShopExists", modal.type === "ProductShopAdd"]);

  useEffect(() => {
    if (shopList.length > 0 && Object.keys(numbers).length === 0) {
      setNumbers(
        Object.fromEntries(
          shopList
            .filter((book) => book.id !== undefined)
            .map((book) => [book.id as number, book.numbering ?? 1])
        )
      );
    }
  }, [shopList]);

  const syncNumbersToShopList = () => {
    setShopList((prev) =>
      prev.map((book) => ({
        ...book,
        numbering: book.id !== undefined ? (numbers[book.id] ?? 1) : 1,
      }))
    );
  };

  useEffect(() => {
    if (Object.keys(numbers).length > 0) {
      syncNumbersToShopList();
    }
  }, [numbers]);

  const handleIncrease = (id: number | undefined) => {
    if (id === undefined) return;
    setNumbers((prev) => ({
      ...prev,
      [id]: (prev[id] ?? 0) + 1,
    }));
  };

  const handleDecrease = (id: number | undefined) => {
    if (id === undefined) return;
    setNumbers((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] ?? 0) - 1, 1),
    }));
  };

  const handleDelete = async (id: number | undefined) => {
    if (id === undefined) return;
    setShopList((prev) => prev.filter((item) => item.id !== id));
    const newNumbers = { ...numbers };
    delete newNumbers[id];
    setNumbers(newNumbers);
    await DeleteSupaBase(id);
  };

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
