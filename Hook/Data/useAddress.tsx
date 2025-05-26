import { useState, useEffect } from "react";

import { useErrorModal } from "./useError";

import { KakaoUserAddress } from "@/data/BookApi";
import { AddressType } from "@/types";

/**
 * `useAddressSearch` 훅은 특정 주소값을 가져오는데 사용합니다
 *
 * @param {string} setsearchQuery - 검색할 set
 * @param {string} searchResults - 검색한 결과값
 */

export const useAddressSearch = (initialQuery = "") => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [searchResults, setSearchResults] = useState<AddressType[]>([]);
  const { openError } = useErrorModal();

  const fetchSearchResults = async (query: string) => {
    try {
      const results = await KakaoUserAddress(query);

      setSearchResults(results);
    } catch (error) {
      openError("DataError");
    }
  };

  useEffect(() => {
    if (searchQuery) {
      fetchSearchResults(searchQuery);
    }
  }, [searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    setSearchResults,
  };
};
