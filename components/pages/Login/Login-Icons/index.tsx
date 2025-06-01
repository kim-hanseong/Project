import styles from "./index.module.css";

import { signInWithKakao } from "@/data/supabase";
import FlexBox from "@/components/common/FlexBox";
import LinkIcon from "@/components/common/Link-Icons";

const KakaoIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 3C6.477 3 2 6.463 2 10.691C2 13.112 3.812 15.163 6.5 16.378V21L10.437 17.562C11.062 17.687 11.718 17.75 12.375 17.75C17.898 17.75 22.375 14.287 22.375 10.059C22.375 5.831 17.898 3 12 3Z"
      fill="#3C1E1E"
    />
  </svg>
);

const LoginIcons = () => {
  return (
    <FlexBox
      $justify="center"
      className={styles.IconWrapper}
      role="group"
      aria-label="소셜 로그인"
    >
      <LinkIcon
        className={styles.Icons}
        onClick={signInWithKakao}
        ButtonIcons={<KakaoIcon />}
        value="카카오 로그인"
        aria-label="카카오 계정으로 로그인"
      />
    </FlexBox>
  );
};

export default LoginIcons;
