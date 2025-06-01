import { Input } from "@nextui-org/react";
import FlexBox from "@/components/common/FlexBox";
import styles from "./index.module.css";

const LoginInput = () => {
  return (
    <FlexBox
      $col
      className={styles.inputContainer}
      role="form"
      aria-label="로그인 폼"
    >
      <Input
        type="text"
        label="아이디"
        className={styles.input}
        variant="bordered"
        aria-required="true"
        aria-label="아이디 입력"
        autoComplete="username"
      />
      <Input
        type="password"
        label="비밀번호"
        className={styles.input}
        variant="bordered"
        aria-required="true"
        aria-label="비밀번호 입력"
        autoComplete="current-password"
      />
    </FlexBox>
  );
};

export default LoginInput;
