import { atom } from "recoil";

export const modalOrderState = atom<string[]>({
  key: "modalOrderState", // 모달 열림 순서를 추적하기 위한 atom
  default: [],
});
