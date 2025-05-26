import ReviewModal from "./focus/ReviewModal";
import CommentModal from "./focus/CommentsDeleteArlam";
import SearchModal from "./Mobile/Search";
import ProductShopArlam from "./ShopModal";
import LoginCheckModal from "./Login";

import { BookDataType } from "@/types";

const ModalCollection = () => {
  const MODAL_COMPONENTS: {
    [key: string]:
      | React.FC<{ data?: BookDataType }>
      | React.FC<{ data: BookDataType }>;
  } = {
    FocusReview: ReviewModal,
    FocusCommentDelete: CommentModal as React.FC<{ data?: BookDataType }>,
    MobileSearchModal: SearchModal as React.FC<{ data?: BookDataType }>,
    ProductShop: ProductShopArlam as React.FC<{ data?: BookDataType }>,
    LoginModal: LoginCheckModal as React.FC<{ data?: BookDataType }>,
  };

  return MODAL_COMPONENTS;
};

export default ModalCollection;
