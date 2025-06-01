import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import { KakaoBookSearch } from "@/data/BookApi";
import { ReadOrder } from "@/data/supabase";
import { BookDataType } from "@/types";
import { LoadingAtom } from "@/components/Recoil/Loading/atom";
import { useErrorModal } from "@/Hook/Data/useError";

export function useMyPage() {
  const [orderList, setShopList] = useState<BookDataType[]>([]);
  const [orderNumbers, setNumbers] = useState<{ [key: string]: number }>({});
  const [loading, setLoading] = useRecoilState(LoadingAtom);
  const { openError } = useErrorModal();

  const fetchBooks = async () => {
    try {
      setLoading((prev) => ({ ...prev, isOpen: true }));
      const result = await ReadOrder();
      const DataId = (result.data || [])
        .map((item) => item.id)
        .filter((num): num is number => num !== undefined);
      const searchQueries = (result.data || []).map((item) => item.title);
      const numberingList = (result.data || [])
        .map((item) => item.numbering)
        .filter((num): num is number => num !== undefined);
      const deliveryList = (result.data || [])
        .map((item) => item.delivery)
        .filter((val): val is boolean => val !== undefined);

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
              delivery: deliveryList[index] ?? false,
            };
          }

          return null;
        })
        .filter((result) => result !== null) as {
        data: BookDataType;
        title: string;
        id: number;
        numbering: number | null;
        delivery: boolean;
      }[];

      setShopList(
        successfulResults.map((item) => ({
          ...item.data,
          id: item.id ?? undefined,
          numbering: item.numbering ?? undefined,
          delivery: item.delivery,
        }))
      );
      setLoading((prev) => ({ ...prev, isOpen: false }));
    } catch (error) {
      openError("DataError");
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []); //
  useEffect(() => {
    if (orderList.length > 0 && Object.keys(orderNumbers).length === 0) {
      setNumbers(
        Object.fromEntries(
          orderList.map((book) => [book.title, book.numbering ?? 1])
        )
      );
    }
  }, [orderList]);

  // ✅ orderNumbers → orderList : 수동 호출 함수
  const syncNumbersToShopList = () => {
    setShopList((prev) =>
      prev.map((book) => ({
        ...book,
        numbering: orderNumbers[book.title] ?? 1,
      }))
    );
  };

  useEffect(() => {
    if (Object.keys(orderNumbers).length > 0) {
      syncNumbersToShopList();
    }
  }, [orderNumbers]);

  return {
    loading,
    orderList,
    setShopList,
    orderNumbers,
    setNumbers,
  };
}
