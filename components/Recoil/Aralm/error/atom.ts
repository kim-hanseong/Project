// recoil atom
import { atom } from "recoil";

import { ModalStateType } from "@/types";

// 알람 : 에러
export const ErrorAralmAtom = atom<ModalStateType>({
  key: "ErrorAralmAtom",
  default: {
    isOpen: false,
    type: "error",
  },
});
