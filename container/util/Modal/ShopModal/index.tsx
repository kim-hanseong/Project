////* Recoil *
import { useRecoilState } from "recoil";
import { useRouter } from "next/navigation";

import CommonModal from "../공용/ConfirmClose";

import { OnOffModal } from "@/components/Recoil/Modal/OnOffModal/atom";

function ProductShopArlam() {
  const [isModalOpen, setIsModalOpen] = useRecoilState(OnOffModal);
  const router = useRouter(); // 🔹 useRouter 사용

  const MODAL_TEXT = {
    Text: {
      MainTitle: "이미 추가된 상품입니다.",
      SubTitle: "추가하시겠습니까?",
    },
  } as const;
  const ADD_MODAL_TEXT = {
    Text: {
      MainTitle: "장바구니에 추가되었습니다.",
      SubTitle: "구매 페이지로 이동할까요?",
    },
  } as const;

  const handleConfirm = () => {
    router.push("/cart"); // 페이지 이동
  };

  return (
    <>
      <CommonModal
        type="ProductShopExists"
        state={isModalOpen}
        setModalState={setIsModalOpen}
        modalText={MODAL_TEXT}
        onConfirm={handleConfirm}
      />
      <CommonModal
        type="ProductShopAdd"
        state={isModalOpen}
        setModalState={setIsModalOpen}
        modalText={ADD_MODAL_TEXT}
        onConfirm={handleConfirm}
      />
    </>
  );
}

export default ProductShopArlam;
