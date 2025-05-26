import { Button } from "@nextui-org/button";

import Modal from "@/components/전역/Modal/ModalContainer";
import styles from "@/container/util/Modal/공용/ConfirmClose/index.module.css";
import { ModalStateType } from "@/types";

type ModalTextType = {
  [key: string]: {
    MainTitle: string;
    SubTitle?: string;
  };
};

interface CommonModalProps {
  state: ModalStateType;
  setModalState: React.Dispatch<React.SetStateAction<ModalStateType>>;
  modalText: ModalTextType; // 이제 ModalTextType을 직접 받음
  onConfirm: () => void;
  Cancle?: boolean; // 🔹 기본값을 true로 설정 가능
  disableRef?: boolean;
  type: string;
}

function CommonModal({
  state,
  setModalState,
  modalText,
  onConfirm,
  Cancle = false, // 🔹 기본값 true
  disableRef = false,
  type,
}: CommonModalProps) {
  const handleClose = () => {
    setModalState({
      isOpen: false,
      type: state.type,
    });
  };

  return (
    <Modal
      type={type}
      state={state}
      setModalState={setModalState}
      name="공용 모달"
      disableRef={disableRef}
    >
      <div className={styles.modalContent}>
        {/* 이제 state.type을 사용하지 않고, modalText를 직접 사용 */}
        <p className={styles.maintext}>{modalText.Text.MainTitle}</p>
        <span className={styles.mintext}>{modalText.Text.SubTitle}</span>
        <div className={styles.modalBtn}>
          {[
            !Cancle && { label: "취소", onClick: handleClose, bg: "#333" },
            { label: "확인", onClick: onConfirm, bg: "#1e3768" },
          ]
            .filter(
              (
                item
              ): item is { label: string; onClick: () => void; bg: string } =>
                Boolean(item)
            ) // 🔹 타입 단언 추가
            .map(({ label, onClick, bg }) => (
              <Button
                key={label}
                style={{ backgroundColor: bg, color: "#fff" }}
                onClick={onClick}
              >
                {label}
              </Button>
            ))}
        </div>
      </div>
    </Modal>
  );
}

export default CommonModal;
