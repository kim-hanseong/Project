//* Recoil import *
import { useRecoilState } from "recoil";

//* 스타일 import *
import styles from "@/components/focus/focus-ReviewTrigger/index.module.css";
//* 컴포넌트 import *
import Info from "@/components/전역/Info";
import ModalTrigger from "@/components/전역/Modal/ModalTrigger";
//* Recoil state import *
import { OnOffModal } from "@/components/Recoil/Modal/OnOffModal/atom";
//* 타입 import *
import { ModalStateType, ProductComment } from "@/types";

//* Props 타입 정의
interface ReviewInfoProps {
  comments: ProductComment[]; // Comments 배열의 타입을 정의
}

// FocusReviewInfo 메인 컴포넌트 정의
const FocusReviewInfo: React.FC<ReviewInfoProps> & {
  Container: React.FC<{ children: React.ReactNode }>;
  InfoSection: React.FC<{ comments: ProductComment[] }>;
  ReviewButton: React.FC<{
    setModal: React.Dispatch<React.SetStateAction<ModalStateType>>;
  }>;
} = ({ comments }) => {
  const [, setModal] = useRecoilState(OnOffModal);

  return (
    <FocusReviewInfo.Container>
      <FocusReviewInfo.InfoSection comments={comments} />
      <FocusReviewInfo.ReviewButton setModal={setModal} />
    </FocusReviewInfo.Container>
  );
};

//* 서브 컴포넌트 정의
FocusReviewInfo.Container = ({ children }) => (
  <div className={styles.ReviewTool}>{children}</div>
);

FocusReviewInfo.InfoSection = ({ comments }) => (
  <Info
    name="책 총 리뷰"
    InfoTitle={<span className={styles.InfoTitle}>BookS 리뷰</span>}
    InfoContents={comments.length} // 리뷰 수
    className={styles.FocusInfo}
  />
);

FocusReviewInfo.ReviewButton = ({ setModal }) => {
  return (
    <ModalTrigger
      ButtonComponent={<button className={styles.reviewBtn}>리뷰작성</button>}
      UserCheck={true}
      setModalState={setModal}
      type="FocusReview"
      name="리뷰 추가하기 모달"
    />
  );
};

//* displayName 설정
FocusReviewInfo.Container.displayName = "FocusReviewInfo.Container";
FocusReviewInfo.InfoSection.displayName = "FocusReviewInfo.InfoSection";
FocusReviewInfo.ReviewButton.displayName = "FocusReviewInfo.ReviewButton";

export default FocusReviewInfo;
