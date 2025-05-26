// recoil atom
import { atom } from "recoil";

import { ModalStateType } from "@/types";

export const ErrorModal = atom<ModalStateType>({
  key: "ErrorModal",
  default: {
    isOpen: false,
    type: "", // 🔹 기본값을 정해진 형식으로 설정
  },
});

// src/components/Recoil/Modal/OnOffModal/atom.ts
