import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { IoIosClose } from "react-icons/io";
import { AiFillApple } from "react-icons/ai";

import CloseBtn from "@/components/common/CloseBtn";
import { useAuth } from "@/components/layout/User";
import { updatePostById } from "@/data/supabase";
import styles from "./index.module.css";
import { Thumbnail } from "@/components/common/product/Thumbnail";
import { Title } from "@/components/common/product/Title";
import { BookDataType } from "@/types";
import Modal from "@/components/common/Modal/ModalContainer";
import FlexBox from "@/components/common/FlexBox";
import { OnOffModal } from "@/components/Recoil/Modal/OnOffModal/atom";
import { ResultsModal } from "@/components/Recoil/Modal/ResultModal/atom";
import { EditCommentDataAtom } from "@/components/Recoil/data/atom";
import { useErrorModal } from "@/Hook/Data/useError";

interface ReviewModalProps {
  data: BookDataType;
}
const ReviewEditModal = ({ data }: ReviewModalProps) => {
  const [editCommentData] = useRecoilState(EditCommentDataAtom);
  const [modal, setmodal] = useRecoilState(OnOffModal);
  const [, setResulte] = useRecoilState(ResultsModal);
  const { user } = useAuth();
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(-1);
  const { openError } = useErrorModal();

  const isButtonDisabled = comment.length < 10 || rating === -1;

  if (!editCommentData) return null;

  useEffect(() => {
    if (modal.isOpen) {
      setComment(editCommentData?.content ?? "");
      setRating(editCommentData.rating ?? -1);
    }
  }, [modal.isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !editCommentData) return;

    try {
      await updatePostById(editCommentData?.id ?? 0, comment, rating);
      setResulte({ isOpen: true, type: "SuccessEditCommentModal" });
    } catch (error) {
      openError("RefError");
    }
  };

  return (
    <Modal
      state={modal}
      setModalState={setmodal}
      name="댓글 수정 모달"
      type="FocusReviewEdit"
      aria-label="댓글 수정"
      aria-describedby="review-edit-description"
    >
      <div
        className={styles.modalContent}
        role="form"
        aria-label="댓글 수정 폼"
      >
        <BookInfo data={data} />
        <RatingSection rating={rating} setRating={setRating} />
        <CommentInput comment={comment} setComment={setComment} />
        <SubmitButton onClick={handleSubmit} disabled={isButtonDisabled} />
        <CloseBtn
          name="모달 닫기 버튼"
          setModalState={setmodal}
          type="FocusReview"
          ButtonComponent={
            <button className={styles.closeBtn} aria-label="모달 닫기">
              <IoIosClose aria-hidden="true" />
            </button>
          }
        />
      </div>
    </Modal>
  );
};

const BookInfo = ({ data }: { data: BookDataType }) => (
  <div className={styles.BookInfoTool} role="group" aria-label="도서 정보">
    <Thumbnail data={data} className={styles.thumbnail} />
    <Title data={data} className={styles.title} />
  </div>
);

const RatingSection = ({
  rating,
  setRating,
}: {
  rating: number;
  setRating: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState(-1);

  return (
    <FlexBox
      $col={true}
      $justify="center"
      $align="center"
      role="group"
      aria-label="평점 선택"
    >
      <FlexBox>
        {[...Array(5)].map((_, index) => {
          const isActive = rating >= index || hoveredIndex >= index;

          return (
            <button
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(-1)}
              onClick={() => setRating(index)}
              style={{
                opacity: isActive ? 1 : 0.5,
              }}
              className={`${styles.ratingBtn} ${isActive ? styles.buttonDisabled : styles.buttonActive}`}
              aria-label={`${index + 1}점`}
              aria-pressed={isActive}
            >
              <AiFillApple aria-hidden="true" />
            </button>
          );
        })}
      </FlexBox>
      <span className={styles.RatingText} aria-live="polite">
        <b>{rating >= 0 ? rating + 1 : 0}</b>/5
      </span>
    </FlexBox>
  );
};

const CommentInput = ({
  comment,
  setComment,
}: {
  comment: string;
  setComment: React.Dispatch<React.SetStateAction<string>>;
}) => (
  <div className={styles.ReviewTool} role="group" aria-label="댓글 입력">
    <textarea
      placeholder="10자 이상 작성해주세요 :)"
      value={comment}
      onChange={(e) => setComment(e.target.value)}
      required
      className={styles.ReviewTextArea}
      aria-label="댓글 내용"
      aria-required="true"
      aria-invalid={comment.length < 10}
      aria-describedby="comment-requirements"
    />
    <span id="comment-requirements" className="sr-only">
      댓글은 10자 이상 작성해야 합니다.
    </span>
  </div>
);

const SubmitButton = ({
  onClick,
  disabled,
}: {
  onClick: (e: React.FormEvent) => void;
  disabled: boolean;
}) => (
  <button
    type="submit"
    className={`${styles.CommentBtn} ${disabled ? styles.buttonDisabled : styles.buttonActive}`}
    disabled={disabled}
    onClick={onClick}
    aria-label="댓글 수정하기"
    aria-disabled={disabled}
  >
    수정하기
  </button>
);

export default ReviewEditModal;
