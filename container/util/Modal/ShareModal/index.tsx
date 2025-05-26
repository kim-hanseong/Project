import { useRecoilState } from "recoil";

import CommonModal from "../공용/ConfirmClose";

import { OnOffModal } from "@/components/Recoil/Modal/OnOffModal/atom";

const ShareModal = () => {
  const [modal, setModal] = useRecoilState(OnOffModal);

  const MODAL_TEXT = {
    Text: { MainTitle: "URL 이 복사되었습니다." },
  } as const;

  const Close = () => {
    setModal({ isOpen: false, type: "ShareModal" });
  };

  return (
    <CommonModal
      type="ShareModal"
      state={modal}
      setModalState={setModal}
      modalText={MODAL_TEXT}
      onConfirm={Close}
      Cancle={true}
      disableRef={true}
    />
  );
};

export default ShareModal;
