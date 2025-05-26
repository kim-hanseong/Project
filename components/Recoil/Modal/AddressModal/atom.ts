// recoil atom
import { atom } from "recoil";

import { ModalStateType } from "@/types";

export const InputAddressModal = atom<ModalStateType>({
  key: "InputAddressModal",
  default: {
    isOpen: false,
    type: "",
  },
});
export const SearchAddressModal = atom<ModalStateType>({
  key: "SearchAddressModal",
  default: {
    isOpen: false,
    type: "",
  },
});
