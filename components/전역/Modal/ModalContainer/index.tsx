import React, { forwardRef, useEffect } from "react";
import { useRecoilState } from "recoil";

import useOutsideClickHandler from "@/Hook/Ref/useOutSide";
import { modalOrderState } from "@/components/Recoil/Modal/Test/atom";
import { ModalStateType } from "@/types";
import styles from "@/components/전역/Modal/ModalContainer/index.module.css";

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
    <ModalContainer isOpen={state.isOpen} type={state.type}>
      <ModalContents
        ref={!disableRef && isLastModal ? modalRef : null}
        type={state.type}
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
}: {
  isOpen: boolean;
  type?: ModalStateType["type"];
  children: React.ReactNode;
}) => {
  return (
    <div
      className={`${styles.ModalContainer} ${isOpen ? styles.ModalVisible : ""}`}
      data-type={type} // 🔹 data-attribute 활용하여 스타일 적용 가능
    >
      {children}
    </div>
  );
};

const ModalContents = forwardRef<
  HTMLDivElement,
  { type?: ModalStateType["type"]; children: React.ReactNode }
>(({ type, children }, ref) => {
  return (
    <div
      className={styles.relative}
      ref={ref as React.RefObject<HTMLDivElement>}
      data-type={type}
    >
      {children}
    </div>
  );
});

ModalContents.displayName = "ModalContents";

export default Modal;
