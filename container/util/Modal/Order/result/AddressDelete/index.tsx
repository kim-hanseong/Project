import { useRecoilState } from "recoil";

import CommonModal from "../../../공용/ConfirmClose";

import { ResultsModal } from "@/components/Recoil/Modal/ResultModal/atom";
import { OnOffModal } from "@/components/Recoil/Modal/OnOffModal/atom";

const RecentAddressDeleteModal = () => {
  const [, setModal] = useRecoilState(OnOffModal);
  const [commentAddModal, setCommentAddModal] = useRecoilState(ResultsModal);

  const MODAL_TEXT = {
    Text: { MainTitle: "삭제가 완료되었습니다." },
  } as const;

  const Confirm = () => {
    setCommentAddModal({ isOpen: false, type: "RecentAddressDeleteModal" });
  };

  return (
    <CommonModal
      type="RecentAddressDeleteModal"
      state={commentAddModal}
      setModalState={setCommentAddModal}
      modalText={MODAL_TEXT}
      onConfirm={Confirm}
      Cancle={true}
      disableRef={true}
    />
  );
};

export default RecentAddressDeleteModal;
