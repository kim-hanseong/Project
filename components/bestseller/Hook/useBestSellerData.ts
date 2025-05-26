import { useQuery } from "@tanstack/react-query";
import { KakaoBookSearch } from "@/data/BookApi";
import { Best_Book_DB, fetchPostBySlug } from "@/data/supabase";
import { BookDataType } from "@/types";
import { BestSellerParams } from "../types";
import { useErrorModal } from "@/Hook/Data/useError";

export const useBestSellerData = (params: BestSellerParams) => {
  const { openError } = useErrorModal();

  const fetchBooks = async () => {
    try {
      const result = await Best_Book_DB(
        params.bestSellerDB,
        parseInt(params.pagination),
        parseInt(params.pageSize),
        params.sorting
      );

      if (result.data && result.data.length < parseInt(params.pageSize)) {
        return;
      }

      const searchQueries = (result.data || []).map((item) => item.title);
      const searchResults = await Promise.allSettled(
        searchQueries.map((query) => KakaoBookSearch(query))
      );

      const successfulResults = searchResults
        .map((result, index) => {
          if (result.status === "fulfilled") {
            return { data: result.value, title: searchQueries[index] };
          }
          return null;
        })
        .filter((result) => result !== null) as {
        data: BookDataType[];
        title: string;
      }[];

      const successfulTitles = successfulResults.map((result) => result.title);
      const comments = await Promise.all(
        successfulTitles.map((title) => fetchPostBySlug(title))
      );

      const flattenedComments = comments.flat();

      return {
        books: successfulResults.map((book) => ({
          ...book.data[0],
          comments:
            flattenedComments.filter(
              (comment) => comment.slug === book.title
            ) || [],
        })),
        comments: flattenedComments,
      };
    } catch (error) {
      openError("DataError");
      throw error;
    }
  };

  return useQuery({
    queryKey: ["books", params],
    queryFn: fetchBooks,
    enabled: !!params.bestSellerDB && parseInt(params.pagination) > 0,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
