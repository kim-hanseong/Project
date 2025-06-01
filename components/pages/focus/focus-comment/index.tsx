import { useRecoilState, useSetRecoilState } from "recoil";

// styles import
import styles from "./index.module.css";

import UserMatchComponent from "@/components/common/User/UserMatchComponent";
import { UserEmail } from "@/components/common/product/Email";
import { ReviewComments } from "@/components/common/product/Review";
import { ProductComment } from "@/types";
import { RatingList } from "@/components/common/product/RatingList";
import { DateTime } from "@/components/common/product/DataTime";
import PopButton from "@/components/common/PopButton";
import { FixIcons } from "@/public/svg/Fix-icons"; // FixIcons 경로 확인
import FlexBox from "@/components/common/FlexBox";
import { OnOffModal } from "@/components/Recoil/Modal/OnOffModal/atom";
import { EditCommentDataAtom } from "@/components/Recoil/data/atom";
import EmptyProduct from "@/components/common/Empty";
import { useCallback } from "react";

interface UserMatchComponentProps {
  props: ProductComment[];
}

interface UserMatchProps {
  props: ProductComment;
  CustomComponent: React.ReactNode;
}

// FocusCommentsComponent 정의
const FocusCommentsComponent: React.FC<UserMatchComponentProps> & {
  DisPlay: React.FC<{ children: React.ReactNode }>;
  Info: React.FC<{ children: React.ReactNode }>;
  Menu: React.FC<{ children: React.ReactNode }>;
  Item: React.FC<{ children: React.ReactNode }>;
  EmptyComments: React.FC;
  Comment: React.FC<{ props: ProductComment }>;
  UserMatch: React.FC<UserMatchProps>;
} = ({ props }) => {
  const setEditCommentData = useSetRecoilState(EditCommentDataAtom);
  const [, setModal] = useRecoilState(OnOffModal);
  const handleDelete = (id: number | undefined) => {
    if (id === undefined) return;
    setModal({
      isOpen: true,
      type: "FocusCommentDelete",
      id: id,
    });
  };
  const handleEdit = useCallback(
    (data: ProductComment) => {
      if (data.id === undefined) return;
      setModal({
        isOpen: true,
        type: "FocusReviewEdit",
      });
      setEditCommentData(data);
    },
    [setModal, setEditCommentData]
  );

  return (
    <FocusCommentsComponent.DisPlay>
      <FocusCommentsComponent.Menu>
        {props && props.length > 0 ? (
          props.map((data, index) => (
            <FocusCommentsComponent.Item key={data.id || index}>
              <FocusCommentsComponent.Info>
                <UserEmail user={data} className={styles.commentInfoText} />
                <DateTime data={data} className="text-xl md:text-lg" />
                <RatingList data={data} className={styles.Rating} />
                <PopButton
                  value="댓글 수정 / 삭제 버튼"
                  down={true}
                  key={`${data.id || index}-button`}
                  ButtonTrigger={
                    <span>
                      <UserMatchComponent comments={data}>
                        <FixIcons />
                      </UserMatchComponent>
                    </span>
                  }
                  ButtonContent={
                    <FlexBox className={styles.popContent} $col={true}>
                      <button onClick={() => data.id && handleDelete(data.id)}>
                        삭제
                      </button>
                      <button
                        onClick={() => {
                          handleEdit(data);
                        }}
                      >
                        수정
                      </button>
                    </FlexBox>
                  }
                />
              </FocusCommentsComponent.Info>
              <FocusCommentsComponent.Comment
                key={`${data.id || index}-comment`}
                props={data}
              />
            </FocusCommentsComponent.Item>
          ))
        ) : (
          <EmptyProduct
            className="w-full"
            message="작성된 댓글이 없습니다."
            submessage="처음 댓글을 입력해보세요!"
          />
        )}
      </FocusCommentsComponent.Menu>
    </FocusCommentsComponent.DisPlay>
  );
};

// 개별 서브 컴포넌트 정의
FocusCommentsComponent.DisPlay = ({ children }) => (
  <div role="region" aria-label="댓글 목록" className={styles.commentTool}>
    {children}
  </div>
);

FocusCommentsComponent.Menu = ({ children }) => (
  <ul aria-label="댓글 목록" className={styles.commentMenu}>
    {children}
  </ul>
);

FocusCommentsComponent.Item = ({ children }) => (
  <li className={styles.commentMenuItem}>{children}</li>
);

FocusCommentsComponent.Info = ({ children }) => (
  <div
    role="group"
    aria-label="댓글 정보"
    className={styles.commentInfoContainer}
  >
    {children}
  </div>
);

FocusCommentsComponent.Comment = ({ props }) => (
  <ReviewComments data={props} className={styles.commentText} />
);

FocusCommentsComponent.EmptyComments = () => (
  <div className={styles.Empty}>작성된 댓글이 없습니다.</div>
);

FocusCommentsComponent.UserMatch = ({
  props,
  CustomComponent,
}: UserMatchProps) => (
  <UserMatchComponent comments={props}>{CustomComponent}</UserMatchComponent>
);

// displayName 설정
FocusCommentsComponent.DisPlay.displayName = "FocusCommentsComponent.DisPlay";
FocusCommentsComponent.Menu.displayName = "FocusCommentsComponent.Menu";
FocusCommentsComponent.Item.displayName = "FocusCommentsComponent.Item";
FocusCommentsComponent.Info.displayName = "FocusCommentsComponent.Info";
FocusCommentsComponent.Comment.displayName = "FocusCommentsComponent.Comment";
FocusCommentsComponent.EmptyComments.displayName =
  "FocusCommentsComponent.EmptyComments";
FocusCommentsComponent.UserMatch.displayName =
  "FocusCommentsComponent.UserMatch";

export default FocusCommentsComponent;
