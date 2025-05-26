import FlexBox from "../전역/FlexBox";

import styles from "./index.module.css";
import LoginLogo from "./Login-Logo";
import LoginInput from "./Login-Input";
import LoginIcons from "./Login-Icons";

function LoginPage() {
  return (
    <div className={styles.container}>
      <FlexBox $col className={styles.Wrapper}>
        <LoginLogo />
        <LoginInput />
        <LoginIcons />
      </FlexBox>
    </div>
  );
}

export default LoginPage;
