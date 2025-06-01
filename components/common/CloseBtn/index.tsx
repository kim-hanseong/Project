import React from "react";

import { ModalStateType } from "@/types";
/**
 * Modal 을 닫을 때 사용합니다
 *
 * @param {React.ReactNode} props.ButtonComponent - 클릭할 버튼 컴포넌트입니다.
 * @param {React.Dispatch<React.SetStateAction<ModalStateType>>} props.setModalState - 모달 상태를 변경하는 함수입니다.
 * @param {ModalStateType["type"]} props.type - 열릴 모달의 타입입니다.
 * @param {boolean} [props.UserCheck] - 사용자 확인 여부 (선택적 prop)입니다.
 *
 * @returns {React.ReactNode} - 버튼 컴포넌트를 포함하는 JSX입니다.
 */
const CloseBtn = ({
  ButtonComponent,
  setModalState,
  type,
  name,
}: {
  ButtonComponent: React.ReactNode;
  setModalState: React.Dispatch<React.SetStateAction<ModalStateType>>;
  type: ModalStateType["type"];
  name: string;
  UserCheck?: boolean;
}) => {
  return (
    <>
      {React.cloneElement(ButtonComponent as React.ReactElement, {
        onClick: () => {
          setModalState((prev) => ({ ...prev, isOpen: false, type }));
        },
        "aria-label": `${name} 닫기`,
        role: "button",
        tabIndex: 0,
        onKeyDown: (e: React.KeyboardEvent) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setModalState((prev) => ({ ...prev, isOpen: false, type }));
          }
        },
      })}
    </>
  );
};

export default CloseBtn;
// } else {
//   setModalState({ isOpen: true, type: type });
// }
