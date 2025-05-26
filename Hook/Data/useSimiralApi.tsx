import { useQuery } from "@tanstack/react-query";

import { useErrorModal } from "./useError";

import { BookDataType } from "@/types";
import { KakaoBookSearch } from "@/data/BookApi";

interface UseBookSearchProps {
  slug: string;
}

/**
 * `useSimiralBookSearch` 훅은 slug 에 써진 title 을 기반으로 비슷한 형태의 책을 나오게 합니다..
 * @slug {string} - 제목
 * @returns {boolean} isLoading - 데이터 로딩 상태.
 * @returns {boolean} isError - 데이터 로딩 중 오류 상태.
 * @returns {Error} error - 오류 객체. `DataError Modal`
 */

const useSimiralBookSearch = ({ slug }: UseBookSearchProps) => {
  const { openError } = useErrorModal();

  const handleSearch = async (): Promise<BookDataType[]> => {
    try {
      const encodedSlug = slug.split(" ")[0];
      const searchResults = await KakaoBookSearch(encodedSlug);

      return searchResults;
    } catch (error) {
      openError("DataError");
      throw error;
    }
  };

  const {
    data: simiralBook = [],
    isLoading,
    isError,
    error,
  } = useQuery<BookDataType[], Error>({
    queryKey: ["simiralBookApi", slug],
    queryFn: handleSearch,
    enabled: !!slug,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  return { simiralBook, isLoading, isError, error };
};

export default useSimiralBookSearch;
