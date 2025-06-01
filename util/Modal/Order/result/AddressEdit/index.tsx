import { useRecoilState } from "recoil";

import CommonModal from "../../../공용/ConfirmClose";

import { ResultsModal } from "@/components/Recoil/Modal/ResultModal/atom";
import { OnOffModal } from "@/components/Recoil/Modal/OnOffModal/atom";

const RecentAddressEditModal = () => {
  const [, setModal] = useRecoilState(OnOffModal);
  const [commentAddModal, setCommentAddModal] = useRecoilState(ResultsModal);
  const MODAL_TEXT = {
    Text: { MainTitle: "기본배송지가 변경되었습니다." },
  } as const;

  const Confirm = () => {
    setCommentAddModal({ isOpen: false, type: "RecentAddressEditModal" });
    setModal({ isOpen: false, type: "choiceAddress" });
  };

  return (
    <CommonModal
      type="RecentAddressEditModal"
      state={commentAddModal}
      setModalState={setCommentAddModal}
      modalText={MODAL_TEXT}
      onConfirm={Confirm}
      Cancle={true}
      disableRef={true}
      aria-label="기본 배송지 변경 완료 모달"
    />
  );
};

export default RecentAddressEditModal;
