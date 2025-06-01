import { useRecoilState } from "recoil";

import CommonModal from "../../../공용/ConfirmClose";

import { ResultsModal } from "@/components/Recoil/Modal/ResultModal/atom";
import { OnOffModal } from "@/components/Recoil/Modal/OnOffModal/atom";

const SuccessEditCommentModal = () => {
  const [, setModal] = useRecoilState(OnOffModal);
  const [commentAddModal, setCommentAddModal] = useRecoilState(ResultsModal);

  const MODAL_TEXT = {
    Text: { MainTitle: "성공적으로 수정되었습니다." },
  } as const;

  const Close = () => {
    setModal({ isOpen: false, type: "FocusReviewEdit" });
    setCommentAddModal({ isOpen: false, type: "SuccessEditCommentModal" });
  };

  return (
    <CommonModal
      type="SuccessEditCommentModal"
      state={commentAddModal}
      setModalState={setCommentAddModal}
      modalText={MODAL_TEXT}
      onConfirm={Close}
      Cancle={true}
      disableRef={true}
      aria-label="댓글 수정 성공"
      aria-describedby="comment-edit-success-description"
    />
  );
};

export default SuccessEditCommentModal;
