import { Image } from "@nextui-org/react";

import styles from "./index.module.css";

import LinkIcon from "@/components/전역/Link-Icons";

const LoginLogo = () => {
  return (
    <div className={styles.logoContainer}>
      <LinkIcon
        ButtonIcons={
          <Image
            src="/Books.png"
            alt="Books Icon"
            className={styles.logoImage}
          />
        }
        value="로고 홈 버튼"
        Href="/"
      />
    </div>
  );
};

export default LoginLogo;
