import { useQuery } from "@tanstack/react-query";

import { useErrorModal } from "./useError";

import { KakaoBookSearch } from "@/data/BookApi";

interface UseBookSearchProps {
  slug: string;
}

/**
 * `useBookApi` 훅은 특정 `slug`를 기반으로 책 데이터를 검색하는 데 사용됩니다.
 *
 * @param {Object} props - 훅에 전달되는 매개변수 객체
 * @param {string} props.slug - 검색할 책의 고유한 `slug` 값
 *
 * @returns {Object} - 훅에서 반환되는 객체
 * @returns {BookDataType | null} focusBook - 검색된 첫 번째 책 데이터. 결과가 없으면 `null`.
 * @returns {BookDataType[] | []} searchResults - 전체 검색 결과 배열
 * @returns {boolean} isLoading - 데이터 로딩 상태.
 * @returns {boolean} isError - 데이터 로딩 중 오류 상태.
 * @returns {Error} error - 오류 객체. `DataError Modal`
 */
const useBookApi = ({ slug }: UseBookSearchProps) => {
  // * Error
  const { openError } = useErrorModal();

  const handleSearch = async () => {
    try {
      const encodedSlug = encodeURIComponent(slug);
      const searchResults = await KakaoBookSearch(encodedSlug);

      return searchResults;
    } catch (error) {
      openError("DataError");
      throw error; // React Query가 `isError`와 `error` 값을 자동으로 설정하도록 오류 전파
    }
  };

  const {
    data: searchResults = [], // ✅ 전체 결과 (기본값 빈 배열)
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["BookApi", slug],
    queryFn: handleSearch,
    enabled: !!slug,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const focusBook = searchResults.length > 0 ? searchResults[0] : null; // ✅ 첫 번째만 추출

  return { focusBook, searchResults, isLoading, isError, error };
};

export default useBookApi;
