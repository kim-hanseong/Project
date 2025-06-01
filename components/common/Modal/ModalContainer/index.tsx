import React, { forwardRef, useEffect } from "react";

import useOutsideClickHandler from "@/Hook/Ref/useOutSide";
import { modalOrderState } from "@/components/Recoil/Modal/Test/atom";
import { ModalStateType } from "@/types";
import styles from "./index.module.css";
import { useRecoilState } from "recoil";

type ModalProps = {
  state: ModalStateType;
  setModalState?: React.Dispatch<React.SetStateAction<ModalStateType>>;
  children: React.ReactNode;
  name: string;
  type?: ModalStateType["type"]; // 🔹 특정 타입의 모달만 렌더링하기 위한 추가
  disableRef?: boolean;
};

const Modal = ({
  state,
  setModalState,
  children,
  name,
  type, // 🔹 특정 타입의 모달을 위한 인수
  disableRef = false,
}: ModalProps) => {
  if (state.type !== type) return null; // 🔹 현재 모달 타입이 요청한 타입과 다르면 렌더링하지 않음
  const [modalOrder, setModalOrder] = useRecoilState(modalOrderState);

  const modalRef = useOutsideClickHandler(state.isOpen, () =>
    setModalState ? setModalState({ ...state, isOpen: false }) : null
  );

  useEffect(() => {
    setModalOrder((prevOrder) => {
      if (state.isOpen && !prevOrder.includes(name)) {
        return [...prevOrder, name];
      }
      if (!state.isOpen && prevOrder.includes(name)) {
        return prevOrder.filter((modalName) => modalName !== name);
      }

      return prevOrder;
    });
  }, [state.isOpen, name, setModalOrder]);

  const isLastModal = modalOrder[modalOrder.length - 1] === name;

  return (
    <ModalContainer isOpen={state.isOpen} type={state.type} name={name}>
      <ModalContents
        ref={!disableRef && isLastModal ? modalRef : null}
        type={state.type}
        name={name}
      >
        {children}
      </ModalContents>
    </ModalContainer>
  );
};

const ModalContainer = ({
  isOpen,
  type,
  children,
  name,
}: {
  isOpen: boolean;
  type?: ModalStateType["type"];
  children: React.ReactNode;
  name: string;
}) => {
  return (
    <div
      className={`${styles.ModalContainer} ${isOpen ? styles.ModalVisible : ""}`}
      data-type={type}
      role="dialog"
      aria-modal="true"
      aria-label={name}
      aria-hidden={!isOpen}
    >
      {children}
    </div>
  );
};

const ModalContents = forwardRef<
  HTMLDivElement,
  { type?: ModalStateType["type"]; children: React.ReactNode; name: string }
>(({ type, children, name }, ref) => {
  return (
    <div
      className={styles.relative}
      ref={ref as React.RefObject<HTMLDivElement>}
      data-type={type}
      role="document"
      aria-label={`${name} 내용`}
    >
      {children}
    </div>
  );
});

ModalContents.displayName = "ModalContents";

export default Modal;
