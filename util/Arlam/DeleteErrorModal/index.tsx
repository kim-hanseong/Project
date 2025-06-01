import { useRecoilState } from "recoil";
import { useRouter } from "next/navigation";

import CommonModal from "../../Modal/공용/ConfirmClose";

import { ErrorModal } from "@/components/Recoil/Modal/ErrorModal/atom";

const DeleteErrorModal = () => {
  const router = useRouter();
  const [errormodal, setError] = useRecoilState(ErrorModal);

  const MODAL_TEXT = {
    Text: { MainTitle: "삭제하는데 오류가 생겼습니다." },
  } as const;

  const Close = () => {
    setError({ isOpen: false, type: "DeleteError" });
    router.push("/"); // router.push로 수정
  };

  return (
    <CommonModal
      type="DeleteError"
      state={errormodal}
      setModalState={setError}
      modalText={MODAL_TEXT}
      onConfirm={Close}
      Cancle={true}
      disableRef={true}
      aria-labelledby="error-modal-title"
      aria-describedby="error-modal-description"
      aria-modal="true"
    />
  );
};

export default DeleteErrorModal;
