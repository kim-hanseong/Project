import { useRecoilState } from "recoil";

import CommonModal from "../../../공용/ConfirmClose";

import { ResultsModal } from "@/components/Recoil/Modal/ResultModal/atom";
import { OnOffModal } from "@/components/Recoil/Modal/OnOffModal/atom";

const SuccessAddCommentModal = () => {
  const [, setModal] = useRecoilState(OnOffModal);
  const [commentAddModal, setCommentAddModal] = useRecoilState(ResultsModal);

  const MODAL_TEXT = {
    Text: { MainTitle: "성공적으로 추가되었습니다." },
  } as const;

  const Close = () => {
    setModal({ isOpen: false, type: "FocusReview" });
    setCommentAddModal({ isOpen: false, type: "SuccessAddCommentModal" });
  };

  return (
    <CommonModal
      type="SuccessAddCommentModal"
      state={commentAddModal}
      setModalState={setCommentAddModal}
      modalText={MODAL_TEXT}
      onConfirm={Close}
      Cancle={true}
      disableRef={true}
    />
  );
};

export default SuccessAddCommentModal;
