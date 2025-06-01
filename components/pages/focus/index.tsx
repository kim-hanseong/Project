import { useRecoilState } from "recoil";

import ModalComponenet from "../../common/컴포넌트구별/ModalComponent";
import NavBarComponent from "../../common/컴포넌트구별/NavBar";
import Componenet from "../../common/컴포넌트구별/Component";
import { OnOffModal } from "../../Recoil/Modal/OnOffModal/atom";
import { ResultsModal } from "../../Recoil/Modal/ResultModal/atom";
import MobileNavbar from "../../layout/Mobile/NavBar";

import { useComments } from "./Hook/useComment";
import FocusSimilarBookSlide from "./focus-SimiralSlide";
import FocusBookInfo from "./focus-Book/BookInfo";
import FocusShareBtn from "./focusShareBtn";
import FocusCommentsComponent from "./focus-comment";
import FocusReviewInfo from "./focus-ReviewTrigger";
import FocusReturn from "./focus-BookReturn";
import FocusMobileBottom from "./focus-NavBar/Bottom";

import ReviewModal from "@/util/Modal/focus/ReviewModal";
import useBookApi from "@/Hook/Data/useBookApi";
import useSimiralBookSearch from "@/Hook/Data/useSimiralApi";
import ProductShopArlam from "@/util/Modal/ShopModal";
import SearchModal from "@/util/Modal/Mobile/Search";
import { BookDataType, ModalStateType } from "@/types";
import ShopListModal from "@/util/Modal/Mobile/Shop";
import ReviewEditModal from "@/util/Modal/focus/ReviewEditModal";
import SuccessEditCommentModal from "@/util/Modal/focus/result/SuccessCommentEditModal";
import SuccessAddCommentModal from "@/util/Modal/focus/result/SuccessCommentAddModal";
import ShareModal from "@/util/Modal/ShareModal";
import DeleteCommentModal from "@/util/Modal/focus/CommentsDeleteArlam";
import { useMediaQuery } from "@/Hook/Responsive/useMediaQuery";

function FocusPage(props: { params: { slug: string } }) {
  // ** Modal
  const [modal] = useRecoilState(OnOffModal);
  const MODAL_COMPONENTS: {
    [key: string]: React.FC<{ data: BookDataType }>;
  } = {
    FocusReview: ReviewModal as React.FC<{ data: BookDataType }>,
    FocusReviewEdit: ReviewEditModal as React.FC<{ data: BookDataType }>,
    FocusCommentDelete: DeleteCommentModal,
    MobileSearchModal: SearchModal,
    MobileShopListModal: ShopListModal,
    ProductShopExists: ProductShopArlam,
    ProductShopAdd: ProductShopArlam,
    ShareModal: ShareModal,
  };
  const FocusModalComponent = MODAL_COMPONENTS[modal.type];

  // ** Results Modal */
  const [resultsModal, setResultsModal] = useRecoilState(ResultsModal);
  const RESULTS_MODAL_COMPONENTS: {
    [key: string]: React.FC<{
      ModalState: ModalStateType;
      setModalState: React.Dispatch<React.SetStateAction<ModalStateType>>;
    }>;
  } = {
    SuccessAddCommentModal: SuccessAddCommentModal,
    SuccessEditCommentModal: SuccessEditCommentModal,
  };

  const FocusResultsModalComponent =
    RESULTS_MODAL_COMPONENTS[resultsModal.type];
  //* URL 디코딩 *
  const decodedString = decodeURIComponent(props.params.slug);
  //* 데이터 : Book API *
  const { focusBook } = useBookApi({
    slug: decodedString,
  });
  //* 데이터 : 연관 책 데이터 *
  const { simiralBook } = useSimiralBookSearch({
    slug: decodedString,
  });
  //* 데이터 : 댓글  *
  const { Comments } = useComments({
    slug: decodedString,
  });
  //* Mobile
  const isMobile = useMediaQuery("(max-width: 768px)"); // 👈 모바일 여부 판별

  return (
    <>
      <NavBarComponent className=" overflow-x-hidden">
        {isMobile && <MobileNavbar mode="full" Title="베스트셀러" />}
        {isMobile && <FocusMobileBottom data={focusBook} />}
      </NavBarComponent>
      <Componenet>
        <FocusBookInfo data={focusBook} />
        <FocusSimilarBookSlide data={simiralBook} name="비슷한 상품 slide" />
        <FocusReviewInfo comments={Comments} />
        <FocusCommentsComponent props={Comments} />
        <FocusReturn />
        <FocusShareBtn />
      </Componenet>
      <ModalComponenet>
        {modal.isOpen && FocusModalComponent && (
          <FocusModalComponent data={focusBook} />
        )}
        {resultsModal.isOpen && FocusResultsModalComponent && (
          <FocusResultsModalComponent
            ModalState={resultsModal} // ModalState 전달
            setModalState={setResultsModal} // setModalState 전달
          />
        )}
      </ModalComponenet>
    </>
  );
}

export default FocusPage;
