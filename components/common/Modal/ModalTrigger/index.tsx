import React from "react";

import { ModalStateType } from "@/types";
import { useLoginCheck } from "@/Hook/Data/useUserCheck";
/**
 * ModalTrigger 컴포넌트는 버튼을 클릭할 때 모달을 오픈하는 역할을 합니다.
 *
 * @param {React.ReactNode} props.ButtonComponent - 클릭할 버튼 컴포넌트입니다.
 * @param {React.Dispatch<React.SetStateAction<ModalStateType>>} props.setModalState - 모달 상태를 변경하는 함수입니다.
 * @param {ModalStateType["type"]} props.type - 열릴 모달의 타입입니다.
 * @param {boolean} props.isOpen - 모달의 열림 상태를 나타내는 값입니다.
 * @param {string} props.name - 모달의 이름입니다.
 * @param {boolean} [props.UserCheck] - 사용자 확인 여부 (선택적 prop)입니다.
 *
 * @returns {React.ReactNode} - 버튼 컴포넌트를 포함하는 JSX입니다.
 */
const ModalTrigger = ({
  ButtonComponent,
  setModalState,
  UserCheck,
  type,
}: {
  ButtonComponent: React.ReactNode;
  setModalState: React.Dispatch<React.SetStateAction<ModalStateType>>;
  type: ModalStateType["type"];
  name: string;
  UserCheck?: boolean;
}) => {
  const { isAuthenticated, checkLogin } = useLoginCheck(); // 로그인 상태 체크 훅 사용

  return (
    <>
      {React.cloneElement(ButtonComponent as React.ReactElement, {
        onClick: () => {
          if (UserCheck) {
            checkLogin();
            if (isAuthenticated) {
              setModalState((prev) => ({ ...prev, isOpen: true, type }));
            }
          } else {
            setModalState((prev) => ({ ...prev, isOpen: true, type }));
          }
        },
      })}
    </>
  );
};

export default ModalTrigger;
// } else {
//   setModalState({ isOpen: true, type: type });
// }
