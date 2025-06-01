//* Reocil *
import { useRecoilValue } from "recoil";
//* next ui *
import { Spinner } from "@nextui-org/react";

//* Atoms *
import { LoadingAtom } from "@/components/Recoil/Loading/atom";
//* style *
import styles from "./index.module.css";
import Modal from "@/components/common/Modal/ModalContainer";

export default function LoadingModal() {
  const LoadingTrue = useRecoilValue(LoadingAtom);
  // const [LoadingTrue, setLoadingTrue] = useRecoilState(LoadingAtom);

  if (!LoadingTrue) {
    return null;
  }

  return (
    <Modal state={LoadingTrue} name="로딩중..." type="Loading">
      <div
        className={styles.Loading}
        role="status"
        aria-live="polite"
        aria-label="페이지 로딩 중"
      >
        <Spinner aria-hidden="true" />
      </div>
    </Modal>
  );
}
