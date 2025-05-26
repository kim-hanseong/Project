// recoil atom
import { atom } from "recoil";

import { ModalStateType } from "@/types";

// 알람 : Loading
export const LoadingAtom = atom<ModalStateType>({
  key: "LoadingAtom",
  default: {
    isOpen: false,
    type: "Loading",
  },
});
