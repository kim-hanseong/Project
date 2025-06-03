//* Hook *
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { useQuery } from "@tanstack/react-query";

//* data *
import { fetchPostBySlug2, SortType } from "@/data/supabase";
//* Arlam *
//* type *
import { ProductComment } from "@/types";
import { OnOffModal } from "@/components/Recoil/Modal/OnOffModal/atom";
import { ResultsModal } from "@/components/Recoil/Modal/ResultModal/atom";
import { useErrorModal } from "@/Hook/Data/useError";

// useComments.ts
export const useComments = ({
  slug,
  sorting,
}: {
  slug: string;
  sorting: SortType;
}) => {
  const [Comments, setComments] = useState<ProductComment[]>([]);
  const { openError } = useErrorModal();
  const [CommentAddModal] = useRecoilState(OnOffModal);
  const [CommentDeleteModal] = useRecoilState(OnOffModal);
  const [commentAddModal] = useRecoilState(ResultsModal);

  const fetchComments = async () => {
    try {
      const comments = await fetchPostBySlug2(slug, sorting); // 여기서 외부에서 받은 sorting 사용

      return comments;
    } catch {
      openError("DataError");
    }
  };

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["Comments", slug, sorting], // 반드시 sorting 포함해야 리렌더 됨
    queryFn: fetchComments,
    enabled: !!slug,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  if (
    CommentDeleteModal.type === "FocusCommentDelete" ||
    commentAddModal.type === "SuccessAddCommentModal" ||
    commentAddModal.type === "SuccessEditCommentModal"
  ) {
    refetch();
  }

  useEffect(() => {
    if (data) setComments(data);
  }, [data, isLoading, setComments, CommentAddModal]);

  return {
    Comments,
    isLoading,
    error,
  };
};
