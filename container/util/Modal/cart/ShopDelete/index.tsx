import { useRecoilState } from "recoil";

import CommonModal from "../../공용/ConfirmClose";

import { OnOffModal } from "@/components/Recoil/Modal/OnOffModal/atom";
import { DeleteShopDB } from "@/data/supabase";
import { ErrorModal } from "@/components/Recoil/Modal/ErrorModal/atom";

const CartDeleteModal = () => {
  const [ModalState, setModalState] = useRecoilState(OnOffModal);
  const [, setModal] = useRecoilState(ErrorModal);

  const DeleteComment = async (id: number) => {
    try {
      setModalState({ isOpen: false, type: "CartDataDelete" });
      setModalState({ isOpen: false, type: "ReusltsCartDataDelete" });

      await DeleteShopDB(id);
    } catch (error) {
      setModal({ isOpen: true, type: "DeleteError" });
    }
  };

  const MODAL_TEXT = {
    Text: {
      MainTitle: "장바구니에서 삭제하시겠습니까?",
      SubTitle: "이 작업은 되돌릴 수 없습니다.",
    },
  } as const;

  return (
    <CommonModal
      type="CartDataDelete"
      state={ModalState}
      setModalState={setModalState}
      modalText={MODAL_TEXT}
      onConfirm={() => {
        if (ModalState.id) {
          DeleteComment(ModalState.id);
        }
      }}
    />
  );
};

export default CartDeleteModal;
