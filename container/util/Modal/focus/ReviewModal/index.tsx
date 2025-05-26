import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { IoIosClose } from "react-icons/io";
import { AiFillApple } from "react-icons/ai";

import CloseBtn from "@/components/전역/CloseBtn";
import { useAuth } from "@/components/layout/User";
import styles from "@/container/util/Modal/focus/ReviewModal/index.module.css";
import { Thumbnail } from "@/container/product/Thumbnail";
import { Title } from "@/container/product/Title";
import { BookDataType } from "@/types";
import Modal from "@/components/전역/Modal/ModalContainer";
import FlexBox from "@/components/전역/FlexBox";
import { OnOffModal } from "@/components/Recoil/Modal/OnOffModal/atom";
import { ResultsModal } from "@/components/Recoil/Modal/ResultModal/atom";
import { ErrorModal } from "@/components/Recoil/Modal/ErrorModal/atom";
import { addPost } from "@/data/supabase";

interface ReviewModalProps {
  data: BookDataType;
}

const ReviewModal = ({ data }: ReviewModalProps) => {
  const [modal, setmodal] = useRecoilState(OnOffModal);
  const [, setResulte] = useRecoilState(ResultsModal);
  const [, setErrorModal] = useRecoilState(ErrorModal);
  const { user } = useAuth();
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(-1);
  const isButtonDisabled = comment.length < 10 || rating === -1;

  useEffect(() => {
    if (modal.isOpen) {
      setComment("");
      setRating(-1);
    }
  }, [modal.isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      await addPost(data.title, comment, rating + 1, user.email);
      setResulte({ isOpen: true, type: "SuccessAddCommentModal" });
    } catch (error) {
      setErrorModal({ isOpen: true, type: "RefError " });
    }
  };

  return (
    <Modal
      state={modal}
      setModalState={setmodal}
      name="장바구니 모달"
      type="FocusReview"
    >
      <div className={styles.modalContent}>
        <BookInfo data={data} />
        <RatingSection rating={rating} setRating={setRating} />
        <CommentInput comment={comment} setComment={setComment} />
        <SubmitButton onClick={handleSubmit} disabled={isButtonDisabled} />
        <CloseBtn
          name="모달 닫기 버튼"
          setModalState={setmodal}
          type="FocusReview"
          ButtonComponent={
            <button className={styles.closeBtn}>
              <IoIosClose />
            </button>
          }
        />
      </div>
    </Modal>
  );
};

const BookInfo = ({ data }: { data: BookDataType }) => (
  <div className={styles.BookInfoTool}>
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
    <FlexBox $col={true} $justify="center" $align="center">
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
            >
              <AiFillApple />
            </button>
          );
        })}
      </FlexBox>
      <span className={styles.RatingText}>
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
  <div className={styles.ReviewTool}>
    <textarea
      placeholder="10자 이상 작성해주세요 :)"
      value={comment}
      onChange={(e) => setComment(e.target.value)}
      required
      className={styles.ReviewTextArea}
    />
  </div>
);
const SubmitButton = ({
  onClick,
  disabled,
}: {
  onClick: (e: React.FormEvent) => void; // e를 받을 수 있도록 수정
  disabled: boolean;
}) => (
  <button
    type="submit"
    className={`${styles.CommentBtn} ${disabled ? styles.buttonDisabled : styles.buttonActive}`}
    disabled={disabled}
    onClick={onClick} // 이벤트를 정상적으로 전달
  >
    작성완료
  </button>
);

export default ReviewModal;
