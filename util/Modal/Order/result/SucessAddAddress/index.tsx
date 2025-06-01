import { useRecoilState } from "recoil";

import CommonModal from "../../../공용/ConfirmClose";

import { ResultsModal } from "@/components/Recoil/Modal/ResultModal/atom";
import { InputAddressModal } from "@/components/Recoil/Modal/AddressModal/atom";

const SuccessAddAddresModal = () => {
  const [commentAddModal, setCommentAddModal] = useRecoilState(ResultsModal);
  const [, setSearchaddAddress] = useRecoilState(InputAddressModal);

  const MODAL_TEXT = {
    Text: { MainTitle: "주소지가 추가되었습니다." },
  } as const;

  const Confirm = () => {
    setCommentAddModal({ isOpen: false, type: "SuccessAddAddresModal" });
    setSearchaddAddress({ isOpen: false, type: "SearchAddressModal" });
  };

  return (
    <CommonModal
      type="SuccessAddAddresModal"
      state={commentAddModal}
      setModalState={setCommentAddModal}
      modalText={MODAL_TEXT}
      onConfirm={Confirm}
      Cancle={true}
      disableRef={true}
      aria-label="주소지 추가 완료 모달"
    />
  );
};

export default SuccessAddAddresModal;
