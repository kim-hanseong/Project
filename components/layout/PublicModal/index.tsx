import { useRecoilState } from "recoil";

import { ErrorModal } from "@/components/Recoil/Modal/ErrorModal/atom";
import DataErrorModal from "@/container/util/Arlam/DataErrorModal";
//* child components *
import LoadingModal from "@/container/util/Arlam/Loading";
import LoginCheckModal from "@/container/util/Modal/Login";
import RefErrorModal from "@/container/util/Arlam/ErrorModal";
import DeleteErrorModal from "@/container/util/Arlam/DeleteErrorModal";

const PublicModal: React.FC = () => {
  const [errormodal] = useRecoilState(ErrorModal);

  const ERROR_MODAL_COMPONENTS: {
    [key: string]: React.FC;
  } = {
    DataError: DataErrorModal,
    RefError: RefErrorModal,
    DeleteError: DeleteErrorModal,
  };
  const ErrorModalComponent = ERROR_MODAL_COMPONENTS[errormodal.type];

  return (
    <>
      <LoadingModal />
      <LoginCheckModal />
      {errormodal.isOpen && ErrorModalComponent && <ErrorModalComponent />}
    </>
  );
};

export default PublicModal;
