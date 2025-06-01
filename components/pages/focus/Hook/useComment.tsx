//* Hook *
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { useQuery } from "@tanstack/react-query";

//* data *
import { fetchPostBySlug2 } from "@/data/supabase";
//* Arlam *
//* type *
import { ProductComment } from "@/types";
import { OnOffModal } from "@/components/Recoil/Modal/OnOffModal/atom";
import { ResultsModal } from "@/components/Recoil/Modal/ResultModal/atom";
import { useErrorModal } from "@/Hook/Data/useError";

export const useComments = ({ slug }: ProductComment) => {
  //* 데이터 : 댓글 data *
  const [Comments, setComments] = useState<ProductComment[]>([]);
  const [Commentspagination] = useState<number>(1);
  //* 데이터 : 댓글 페이지사이즈 *
  const [Commentspagesize] = useState<number>(5);
  //* Modal : 댓글 추가 Modal
  const [CommentAddModal] = useRecoilState(OnOffModal);
  const [CommentDeleteModal] = useRecoilState(OnOffModal);
  const [commentAddModal] = useRecoilState(ResultsModal);
  const { openError } = useErrorModal();

  //* 알람 : 리뷰작성 모달 오픈 $$ *

  //* function : Comment pagination fetch
  const fetchComments = async () => {
    try {
      const comments = await fetchPostBySlug2(
        slug,
        Commentspagination,
        Commentspagesize
      );

      return comments.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    } catch {
      openError("DataError");
    }
  };

  //* 데이터 쿼리
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["Comments", slug, Commentspagination, Commentspagesize],
    queryFn: fetchComments,
    enabled: !!slug,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  // CommentAddModal이 변경될 때 refetch 실행
  if (
    CommentDeleteModal.type === "FocusCommentDelete" ||
    commentAddModal.type === "SuccessAddCommentModal" ||
    commentAddModal.type === "SuccessEditCommentModal"
  ) {
    refetch();
  }

  //* Effect : 댓글 및 상태 업데이트
  useEffect(() => {
    if (data) setComments(data);
  }, [data, isLoading, setComments, CommentAddModal]);

  return {
    Comments,
    isLoading,
    error,
  };
};
