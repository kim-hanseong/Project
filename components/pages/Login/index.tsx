import FlexBox from "../../common/FlexBox";

import styles from "./index.module.css";
import LoginLogo from "./Login-Logo";
import LoginInput from "./Login-Input";
import LoginIcons from "./Login-Icons";

function LoginPage() {
  return (
    <div className={styles.container} aria-label="로그인 페이지">
      <FlexBox $col className={styles.Wrapper} aria-label="로그인 폼">
        <LoginLogo />
        <LoginInput />
        <LoginIcons />
      </FlexBox>
    </div>
  );
}

export default LoginPage;
