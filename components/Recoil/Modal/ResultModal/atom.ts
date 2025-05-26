// recoil atom
import { atom } from "recoil";

import { ModalStateType } from "@/types";

export const ResultsModal = atom<ModalStateType>({
  key: "ResultsModal",
  default: {
    isOpen: false,
    type: "",
  },
});
