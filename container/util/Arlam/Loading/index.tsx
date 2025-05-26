//* Reocil *
import { useRecoilValue } from "recoil";
//* next ui *
import { Spinner } from "@nextui-org/react";

//* Atoms *
import { LoadingAtom } from "@/components/Recoil/Loading/atom";
//* style *
import styles from "@/container/util/Arlam/Loading/index.module.css";
import Modal from "@/components/전역/Modal/ModalContainer";

export default function LoadingModal() {
  const LoadingTrue = useRecoilValue(LoadingAtom);
  // const [LoadingTrue, setLoadingTrue] = useRecoilState(LoadingAtom);

  if (!LoadingTrue) {
    return null;
  }

  return (
    <Modal state={LoadingTrue} name="로딩중..." type="Loading">
      <div className={styles.Loading}>
        <Spinner />
      </div>
    </Modal>
  );
}
