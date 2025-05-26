//* Hook *
import { useRouter } from "next/navigation";
//* Recoil *
import { useRecoilState } from "recoil";
//* next ui *
import { Button } from "@nextui-org/button";

//* Custom Hook *

//* Atopms *
//* style *
import styles from "@/container/util/Modal/Login/index.module.css";
import Modal from "@/components/전역/Modal/ModalContainer";
import { OnOffModal } from "@/components/Recoil/Modal/OnOffModal/atom";

function LoginCheckModal() {
  //* 알람 : 로그인 체크 알람 *
  const [LoginCheckAralm, setLoginCheckAralm] = useRecoilState(OnOffModal);

  //* Router *
  const router = useRouter();
  //* funtion : close Modal *
  const Close = () => {
    setLoginCheckAralm({ isOpen: false, type: "LoginModal" });
    router.push("/");
  };
  //* funtion : router Move *
  const Move = () => {
    router.push("/Login");
    setLoginCheckAralm({ isOpen: false, type: "LoginModal" });
  };

  return (
    <Modal
      state={LoginCheckAralm}
      setModalState={setLoginCheckAralm}
      name="로그인 체크 모달"
      type="LoginModal"
    >
      <div className={styles.modalContent}>
        <div className={styles.maintext}>
          <p>로그인 후 이용가능합니다</p>
          <span className={styles.mintext}>
            로그인 페이지로 이동하시겠습니까 ?
          </span>
        </div>
        <div className={styles.modalBtn}>
          <Button
            onClick={Close}
            style={{ backgroundColor: "#333333", color: "#ffffff" }}
          >
            취소
          </Button>
          <Button
            onClick={Move}
            style={{ backgroundColor: "#1e3768", color: "#ffffff" }}
          >
            확인
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default LoginCheckModal;
