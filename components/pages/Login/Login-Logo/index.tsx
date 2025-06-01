import { Image } from "@nextui-org/react";

import styles from "./index.module.css";

import LinkIcon from "@/components/common/Link-Icons";

const LoginLogo = () => {
  return (
    <div className={styles.logoContainer} role="banner">
      <LinkIcon
        ButtonIcons={
          <Image
            src="/Books.png"
            alt="Books 로고 - 홈으로 이동"
            className={styles.logoImage}
            aria-label="홈으로 이동"
          />
        }
        value="로고 홈 버튼"
        Href="/"
      />
    </div>
  );
};

export default LoginLogo;
