import { useRecoilState } from "recoil";

import CommonModal from "../../공용/ConfirmClose";

import { DeleteSlugDB } from "@/data/supabase";
import { OnOffModal } from "@/components/Recoil/Modal/OnOffModal/atom";
import { useErrorModal } from "@/Hook/Data/useError";

function DeleteCommentModal() {
  const [modal, setModal] = useRecoilState(OnOffModal);
  const { openError } = useErrorModal();

  const MODAL_TEXT = {
    Text: {
      MainTitle: "정말로 삭제하시겠습니까?",
      SubTitle: "이 작업은 되돌릴 수 없습니다.",
    },
  } as const;

  const DeleteComment = async (id: number) => {
    try {
      await DeleteSlugDB(id);
      setModal({
        isOpen: false,
        type: "FocusCommentDelete",
        id: id,
      }); // 모달 닫기
    } catch (error) {
      openError("DeleteError"); // 모달 닫기
    }
  };

  return (
    <CommonModal
      state={modal}
      setModalState={setModal}
      modalText={MODAL_TEXT}
      type="FocusCommentDelete"
      onConfirm={() => {
        if (modal.id) {
          DeleteComment(modal.id);
        }
      }}
      Cancle={true}
      disableRef={true}
      aria-label="댓글 삭제 확인"
      aria-describedby="comment-delete-description"
    />
  );
}

export default DeleteCommentModal;
