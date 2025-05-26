import { useRecoilState, useSetRecoilState } from "recoil";

// styles import
import styles from "@/components/focus/focus-comment/index.module.css";
import UserMatchComponent from "@/components/전역/User/UserMatchComponent";
import { UserEmail } from "@/container/product/Email";
import { ReviewComments } from "@/container/product/Review";
import { ProductComment } from "@/types";
import { RatingList } from "@/container/product/RatingList";
import { DateTime } from "@/container/product/DataTime";
import RePlaceTag from "@/components/전역/RePlaceTag";
import PopButton from "@/components/전역/PopButton";
import { FixIcons } from "@/public/svg/Fix-icons"; // FixIcons 경로 확인
import FlexBox from "@/components/전역/FlexBox";
import { OnOffModal } from "@/components/Recoil/Modal/OnOffModal/atom";
import { EditCommentDataAtom } from "@/components/Recoil/data/atom";

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
  const handleEdit = (data: ProductComment) => {
    if (data.id === undefined) return;
    setModal({
      isOpen: true,
      type: "FocusReviewEdit",
    });
    setEditCommentData(data);
  };

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
          <FocusCommentsComponent.EmptyComments />
        )}
      </FocusCommentsComponent.Menu>
    </FocusCommentsComponent.DisPlay>
  );
};

// 개별 서브 컴포넌트 정의
FocusCommentsComponent.DisPlay = ({ children }) => (
  <div className={styles.commentTool}>{children}</div>
);

FocusCommentsComponent.Menu = ({ children }) => (
  <ul className={styles.commentMenu}>{children}</ul>
);

FocusCommentsComponent.Item = ({ children }) => (
  <li className={styles.commentMenuItem}>{children}</li>
);

FocusCommentsComponent.Info = ({ children }) => (
  <div className={styles.commentInfoContainer}>{children}</div>
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
