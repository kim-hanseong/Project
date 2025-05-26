import { useRecoilState } from "recoil";
import { useRouter } from "next/navigation";

import CommonModal from "../../Modal/공용/ConfirmClose";

import { ErrorModal } from "@/components/Recoil/Modal/ErrorModal/atom";

const DataErrorModal = () => {
  const router = useRouter();
  const [errormodal, setError] = useRecoilState(ErrorModal);

  const MODAL_TEXT = {
    Text: { MainTitle: "데이터를 가져오는데 오류가 생겼습니다." },
  } as const;

  const Close = () => {
    setError({ isOpen: false, type: "DataError" });
    router.push("/"); // router.push로 수정
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
    />
  );
};

export default DataErrorModal;
