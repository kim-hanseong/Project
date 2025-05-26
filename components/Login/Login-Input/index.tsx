import { Input } from "@nextui-org/react";
import FlexBox from "@/components/전역/FlexBox";
import styles from "./index.module.css";

const LoginInput = () => {
  return (
    <FlexBox $col className={styles.inputContainer}>
      <Input
        type="text"
        label="아이디"
        className={styles.input}
        variant="bordered"
      />
      <Input
        type="password"
        label="비밀번호"
        className={styles.input}
        variant="bordered"
      />
    </FlexBox>
  );
};

export default LoginInput;
