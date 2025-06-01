import { useRecoilState } from "recoil";
import { useRouter } from "next/navigation";

import CommonModal from "../../Modal/공용/ConfirmClose";

import { ErrorModal } from "@/components/Recoil/Modal/ErrorModal/atom";

const DataErrorModal = () => {
  const router = useRouter();
  const [errormodal, setError] = useRecoilState(ErrorModal);

  const MODAL_TEXT = {
    Text: {
      MainTitle: "데이터를 가져오는데 오류가 생겼습니다.",
      SubTitle:
        "잠시 후 다시 시도해주세요. 문제가 지속되면 관리자에게 문의해주세요.",
    },
  } as const;

  const Close = () => {
    setError({ isOpen: false, type: "DataError" });
    router.push("/");
  };

  return (
    <CommonModal
      type="DataError"
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

export default DataErrorModal;
