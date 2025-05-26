import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";

import styles from "./index.module.css";

import { OnOffModal } from "@/components/Recoil/Modal/OnOffModal/atom";
import Modal from "@/components/전역/Modal/ModalContainer";
import ModalTrigger from "@/components/전역/Modal/ModalTrigger";
import { PlusIcons } from "@/public/svg/More-icons";
import TitleTag from "@/components/전역/TitleTag";
import FlexBox from "@/components/전역/FlexBox";
import { deleteAddress, updateRecentSelectedAt } from "@/data/supabase";
import { AddressType, ModalStateType } from "@/types";
import { ResultsModal } from "@/components/Recoil/Modal/ResultModal/atom";
import { InputAddressModal } from "@/components/Recoil/Modal/AddressModal/atom";
import CloseBtn from "@/components/전역/CloseBtn";
import { useModalScroll } from "@/Hook/Ref/useModalScorll";
import { ErrorModal } from "@/components/Recoil/Modal/ErrorModal/atom";
import EmptyProduct from "@/components/전역/Empty";

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
  const [, setErrorModal] = useRecoilState(ErrorModal);

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
      setErrorModal({ isOpen: true, type: "DeleteError" });
    }
  };
  const handleSubmit = async () => {
    if (!selectedId) return;
    try {
      await updateRecentSelectedAt(selectedId);
      setResultsModal({ isOpen: true, type: "RecentAddressEditModal" });
    } catch (error) {
      setErrorModal({ isOpen: true, type: "RefError" });
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
    >
      <ChoiceAddressModal.Body>
        <CloseBtn
          name="모달 닫기 버튼"
          setModalState={setModal}
          type={modaltype}
          ButtonComponent={
            <button className={styles.closeBtn}>
              <IoIosClose />
            </button>
          }
        />
        <ChoiceAddressModal.Title />
        <ModalTrigger
          name="주소 추가 모달 오픈"
          setModalState={setAddAddress}
          type="add"
          ButtonComponent={
            <button className={styles.addButton}>
              <PlusIcons />
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
      <button className={styles.addButton}>
        <PlusIcons />
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
      <div key={item.id} className={styles.card}>
        <input
          type="radio"
          name="address"
          value={item.consumer}
          defaultChecked={index === 0}
          onChange={() => radioChange(item.id)}
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
        >
          <IoIosClose />
        </button>
      </div>
    ))}
  </>
);
ChoiceAddressModal.SubmitBtn = ({ onSubmit }) => (
  <button onClick={onSubmit} className={styles.submitBtn}>
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
