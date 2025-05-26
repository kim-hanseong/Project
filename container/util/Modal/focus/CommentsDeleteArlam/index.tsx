import { useRecoilState } from "recoil";

import CommonModal from "../../공용/ConfirmClose";

import { DeleteSlugDB } from "@/data/supabase";
import { OnOffModal } from "@/components/Recoil/Modal/OnOffModal/atom";
import { ErrorModal } from "@/components/Recoil/Modal/ErrorModal/atom";

function DeleteCommentModal() {
  const [modal, setModal] = useRecoilState(OnOffModal);
  const [, setErrorModal] = useRecoilState(ErrorModal);

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
      setErrorModal({
        isOpen: true,
        type: "DeleteError",
      }); // 모달 닫기
    }
  };

  return (
    <CommonModal
      state={modal}
      setModalState={setModal}
      modalText={MODAL_TEXT} // 이제 state.type에 의존하지 않고 MODAL_TEXT 직접 전달
      type="FocusCommentDelete"
      onConfirm={() => {
        if (modal.id) {
          DeleteComment(modal.id);
        }
      }}
    />
  );
}

export default DeleteCommentModal;
