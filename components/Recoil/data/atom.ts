// src/components/Recoil/Modal/OnOffModal/atom.ts
import { atom } from "recoil";

import { ProductComment } from "@/types";

export const EditCommentDataAtom = atom<ProductComment | null>({
  key: "EditCommentDataAtom",
  default: null,
});
