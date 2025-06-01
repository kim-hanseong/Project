import { useRecoilState } from "recoil";

import { ErrorModal } from "@/components/Recoil/Modal/ErrorModal/atom";
import DataErrorModal from "@/util/Arlam/DataErrorModal";
//* child components *
import LoadingModal from "@/util/Arlam/Loading";
import LoginCheckModal from "@/util/Modal/Login";
import RefErrorModal from "@/util/Arlam/ErrorModal";
import DeleteErrorModal from "@/util/Arlam/DeleteErrorModal";

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
