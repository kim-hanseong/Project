import { useAuth } from "@/components/layout/User";
import { ProductComment } from "@/types";

interface UserMatchComponentProps {
  comments: ProductComment; // Comments 배열을 props로 받음
  children: React.ReactNode;
}

/**
 * 데이터의 email 과 현재 로그인된 email 을 비교해 작성자면 보여주는 컴포넌트입니다
 *
 * @param {data} data -- Data에 있는 email 을 추출합니다
 * @param {Children} ChildNode -- children 속성으로 컴포넌트를 감쌀 수 있습니다.
 *
 *
 */

const UserMatchComponent: React.FC<UserMatchComponentProps> = ({
  comments,
  children,
}) => {
  const { user } = useAuth();

  if (user && comments.email === user.email) {
    return <>{children}</>;
  } else {
    null;
  }

  return null;
};

export default UserMatchComponent;
