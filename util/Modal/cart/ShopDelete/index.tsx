import { useRecoilState } from "recoil";

import CommonModal from "../../공용/ConfirmClose";

import { OnOffModal } from "@/components/Recoil/Modal/OnOffModal/atom";
import { DeleteShopDB } from "@/data/supabase";
import { useErrorModal } from "@/Hook/Data/useError";

const CartDeleteModal = () => {
  const [ModalState, setModalState] = useRecoilState(OnOffModal);
  const { openError } = useErrorModal();

  const DeleteComment = async (id: number) => {
    try {
      setModalState({ isOpen: false, type: "CartDataDelete" });
      setModalState({ isOpen: false, type: "ReusltsCartDataDelete" });

      await DeleteShopDB(id);
    } catch (error) {
      openError("DeleteError");
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
      Cancle={true}
      disableRef={true}
      aria-label="장바구니 상품 삭제 확인"
      aria-describedby="cart-delete-description"
    />
  );
};

export default CartDeleteModal;
