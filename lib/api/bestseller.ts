import { BookDataType } from "@/types";

interface BestSellerParams {
  category: string;
  pageSize: string;
  pagination: string;
  sorting: string;
}

export async function getBestSellerBooks(params: BestSellerParams) {
  try {
    // 실제 API 엔드포인트로 변경 필요
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/bestseller?` +
        new URLSearchParams({
          category: params.category,
          pageSize: params.pageSize,
          pagination: params.pagination,
          sorting: params.sorting,
        })
    );

    if (!response.ok) {
      throw new Error("Failed to fetch bestseller books");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching bestseller books:", error);
    return {
      books: [],
      totalCount: 0,
    };
  }
}
