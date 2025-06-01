import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";

import styles from "./index.module.css";

import { OnOffModal } from "@/components/Recoil/Modal/OnOffModal/atom";
import Modal from "@/components/common/Modal/ModalContainer";
import ModalTrigger from "@/components/common/Modal/ModalTrigger";
import { PlusIcons } from "@/public/svg/More-icons";
import TitleTag from "@/components/common/TitleTag";
import FlexBox from "@/components/common/FlexBox";
import { deleteAddress, updateRecentSelectedAt } from "@/data/supabase";
import { AddressType, ModalStateType } from "@/types";
import { ResultsModal } from "@/components/Recoil/Modal/ResultModal/atom";
import { InputAddressModal } from "@/components/Recoil/Modal/AddressModal/atom";
import CloseBtn from "@/components/common/CloseBtn";
import { useModalScroll } from "@/Hook/Ref/useModalScorll";
import EmptyProduct from "@/components/common/Empty";
import { useErrorModal } from "@/Hook/Data/useError";

type ModalProps = {
  address: AddressType[];
};

const ChoiceAddressModal: React.FC<ModalProps> & {
  AddAddressTrigger: React.FC<{
    setModal: React.Dispatch<React.SetStateAction<ModalStateType>>;
  }>;
  Body: React.FC<{ children: React.ReactNode }>;
  Title: React.FC;
  AddressWrap: React.FC<{
    address: AddressType[];
    radioChange: (id: number) => void;
    selectId: number | null;
    visibleKeys: string[];
    onDelete: (id: number) => void;
  }>;
  SubmitBtn: React.FC<{ onSubmit: () => void }>;
} = ({ address }: ModalProps) => {
  const [modal, setModal] = useRecoilState(OnOffModal);
  const [, setResultsModal] = useRecoilState(ResultsModal);
  const [, setAddAddress] = useRecoilState(InputAddressModal);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const { openError } = useErrorModal();

  useModalScroll({ isOpen: modal.isOpen });
  const modaltype = "choiceAddress";
  const handleRadioChange = (id: number) => {
    setSelectedId(id);
  };
  const visibleKeys = ["Address", "Phone", "addressinfo", "addressdetailinfo"];
  const handleDelete = async (id: number) => {
    try {
      await deleteAddress(id);
      setResultsModal({ isOpen: true, type: "RecentAddressDeleteModal" });
    } catch (error) {
      openError("DeleteError");
    }
  };
  const handleSubmit = async () => {
    if (!selectedId) return;
    try {
      await updateRecentSelectedAt(selectedId);
      setResultsModal({ isOpen: true, type: "RecentAddressEditModal" });
    } catch (error) {
      openError("RefError");
    }
  };

  useEffect(() => {
    const recentAddress = address.find((item) => item.is_recent);

    if (recentAddress) {
      setSelectedId(recentAddress.id);
    }
  }, [address]);

  return (
    <Modal
      state={modal}
      setModalState={setModal}
      type={modaltype}
      name="주소창 선택 모달"
      aria-label="주소창 선택 모달"
      aria-describedby="choice-address-modal-description"
    >
      <ChoiceAddressModal.Body
        aria-modal="true"
        aria-label="주소창 선택 모달"
        aria-describedby="choice-address-modal-description"
      >
        <span id="choice-address-modal-description" className="sr-only">
          배송지를 선택하는 모달 창입니다. 기본 배송지 또는 다른 배송지를 선택할
          수 있습니다.
        </span>
        <CloseBtn
          name="모달 닫기 버튼"
          setModalState={setModal}
          type={modaltype}
          ButtonComponent={
            <button
              className={styles.closeBtn}
              aria-label="주소창 선택 모달 닫기"
            >
              <IoIosClose aria-hidden="true" />
            </button>
          }
        />
        <ChoiceAddressModal.Title />
        <ModalTrigger
          name="주소 추가 모달 오픈"
          setModalState={setAddAddress}
          type="add"
          ButtonComponent={
            <button className={styles.addButton} aria-label="배송지 추가">
              <PlusIcons aria-hidden="true" />
              배송지 추가
            </button>
          }
        />
        {address.length > 0 ? (
          <ChoiceAddressModal.AddressWrap
            address={address}
            radioChange={handleRadioChange}
            selectId={selectedId}
            visibleKeys={visibleKeys}
            onDelete={handleDelete}
          />
        ) : (
          <EmptyProduct message="주소지가 등록되어있지 않습니다" />
        )}
        <ChoiceAddressModal.SubmitBtn onSubmit={handleSubmit} />
      </ChoiceAddressModal.Body>
    </Modal>
  );
};

ChoiceAddressModal.Body = ({ children }) => (
  <FlexBox $col={true} className={styles.container}>
    {children}
  </FlexBox>
);
ChoiceAddressModal.AddAddressTrigger = ({ setModal }) => (
  <ModalTrigger
    name="주소 추가 모달 오픈"
    setModalState={setModal}
    type="add"
    ButtonComponent={
      <button className={styles.addButton} aria-label="배송지 추가">
        <PlusIcons aria-hidden="true" />
        배송지 추가
      </button>
    }
  />
);
ChoiceAddressModal.Title = () => <TitleTag level={4}>배송지 선택</TitleTag>;
ChoiceAddressModal.AddressWrap = ({
  address,
  radioChange,
  visibleKeys,
  onDelete,
}) => (
  <>
    {address.map((item, index) => (
      <div
        key={item.id}
        className={styles.card}
        role="radio"
        aria-checked={index === 0}
      >
        <input
          type="radio"
          name="address"
          value={item.consumer}
          defaultChecked={index === 0}
          onChange={() => radioChange(item.id)}
          aria-label={`${item.consumer} 배송지 선택`}
        />
        <FlexBox $col={true}>
          {index === 0 && (
            <span className={styles.defaultLabel}>기본배송지</span>
          )}
          <div className={styles.cardContent}>
            {Object.entries(item)
              .filter(([key]) => visibleKeys.includes(key))
              .map(([key, value]) => (
                <p key={key}>{value}</p>
              ))}
          </div>
        </FlexBox>
        <button
          type="button"
          onClick={() => onDelete(item.id)}
          className={styles.deletBtn}
          aria-label={`${item.consumer} 배송지 삭제`}
        >
          <IoIosClose aria-hidden="true" />
        </button>
      </div>
    ))}
  </>
);
ChoiceAddressModal.SubmitBtn = ({ onSubmit }) => (
  <button
    onClick={onSubmit}
    className={styles.submitBtn}
    aria-label="선택한 배송지 저장"
  >
    선택
  </button>
);
ChoiceAddressModal.AddAddressTrigger.displayName =
  "OrderAddress.AddAddressTrigger";
ChoiceAddressModal.Body.displayName = "OrderAddress.Body";
ChoiceAddressModal.Title.displayName = "OrderAddress.Title";
ChoiceAddressModal.AddressWrap.displayName = "OrderAddress.AddressWrap";
ChoiceAddressModal.SubmitBtn.displayName = "OrderAddress.SubmitBtn";

export default ChoiceAddressModal;
