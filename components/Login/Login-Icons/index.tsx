import { RiKakaoTalkFill } from "react-icons/ri";

import styles from "./index.module.css";

import { signInWithKakao } from "@/data/supabase";
import FlexBox from "@/components/전역/FlexBox";
import LinkIcon from "@/components/전역/Link-Icons";

const LoginIcons = () => {
  return (
    <FlexBox $justify="center" className={styles.IconWrapper}>
      <LinkIcon
        className={styles.Icons}
        onClick={signInWithKakao}
        ButtonIcons={<RiKakaoTalkFill />}
        value="카카오 로그인"
      />
    </FlexBox>
  );
};

export default LoginIcons;
