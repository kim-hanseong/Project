//* type *
import { ProductComment } from "@/types";

export const UserEmail: React.FC<{
  user: ProductComment; // 더 명확한 이름 사용
  className?: string;
}> = ({ user, className }) => {
  const { email } = user; // comment에서 email 추출

  if (email) {
    return (
      <span className={className} role="group" aria-label="사용자 이메일">
        {email}
      </span>
    );
  } else {
    return null;
  }
};
