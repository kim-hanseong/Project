import { SetStateAction, SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};
export type ModalState = {
  isOpen: boolean;
  id?: string | number; // 특정 ID가 필요한 경우
};
export type ModalKey =
  | "CommentModal"
  | "LoginModal"
  | "SearchModal"
  | "MobileSearchModal";

export type ModalStateType = {
  isOpen: boolean;
  type: string;
  id?: number;
};
export type ModalTest = {
  id: number;
};

export type ModalStateType2<T = number> = {
  isOpen: boolean;
  type: ""; // 🔹 "CommentModal" | "LoginModal" | "DeleteModal" 중 하나만 가능
  id?: T;
};
export type LoadingStateType = {
  isOpen: boolean;
};

export type CommentType = {
  slug: string;
  rating: number;
};
export type BookDataType = {
  delivery?: boolean;
  id?: number;
  title: string;
  price: number;
  sale_price: number;
  authors: string[]; // 여기서 authors가 문자열 배열인지 확인합니다.
  thumbnail: string;
  publisher: string;
  contents: string;
  datetime: Date;
  created_at?: Date;
  numbering?: number;
  isbn: number;
  comments?: CommentType[];
};

export type BooksData = {
  data: BookDataType[];
  total: number | null;
  error: unknown;
};
// data
export type ProductComment = {
  // ? 혹시 오류가 많이나면 id  ? ㄹ ㄱㄱ
  id?: number;
  slug: string;
  content?: string;
  rating?: number;
  email?: string;
  created_at?: Date;
};

export type AddressType = {
  id: number;
  Address: string;
  Phone: string;
  address_name: string; // 주소 이름

  addressdetailinfo: string;
  addressinfo: string;
  consumer: string;
  created_at: string; // ISO 8601 datetime string
  email: string;
  is_recent: boolean;
};
