import { useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { Input } from "@nextui-org/input";
import { MdOutlineCancel } from "react-icons/md";
import { IoIosClose } from "react-icons/io";

import { SearchIcons } from "@/public/svg/Search-icons";
import styles from "@/container/util/Modal/Order/Address/addAddress/index.module.css";
// Recoil Atoms
import Info from "@/components/전역/Info";
import ModalTrigger from "@/components/전역/Modal/ModalTrigger";
import {
  InputAddressModal,
  SearchAddressModal,
} from "@/components/Recoil/Modal/AddressModal/atom";
import LinkIcon from "@/components/전역/Link-Icons";
import Modal from "@/components/전역/Modal/ModalContainer";
import TitleTag from "@/components/전역/TitleTag";
import CloseBtn from "@/components/전역/CloseBtn";
import { addAddressDB } from "@/data/supabase";
import { ResultsModal } from "@/components/Recoil/Modal/ResultModal/atom";
import { useModalScroll } from "@/Hook/Ref/useModalScorll";
import { ModalStateType } from "@/types";
import { useErrorModal } from "@/Hook/Data/useError";

type AddressInfoInputFieldProps = {
  label: string;
  title: string;
  value: string;
  setter: React.Dispatch<React.SetStateAction<string>>;
  ref: React.RefObject<HTMLInputElement>;
  type: string;
  maxLength?: number; // optional
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // optional
};

interface Search {
  search: string;
}
const AddressInfoInputModal: React.FC<Search> & {
  Body: React.FC<{ children: React.ReactNode }>;
  Title: React.FC;
  InputContents: React.FC<{
    InputFields: AddressInfoInputFieldProps[];
    onReset: (
      setter: React.Dispatch<React.SetStateAction<string>>
    ) => () => void;
  }>;
  SearchModalTrigger: React.FC<{
    setModal: React.Dispatch<React.SetStateAction<ModalStateType>>;
  }>;
  DetailAddress: React.FC<{
    search: string;
    Detail: string;
    setDetailAddress: React.Dispatch<React.SetStateAction<string>>;
    ref: React.RefObject<HTMLInputElement>;
  }>;
  SaveBtn: React.FC<{
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    Disabled: boolean;
  }>;
} = ({ search }) => {
  const { openError } = useErrorModal();

  const [addressName, setAddressName] = useState("");
  const [consumer, setConsumer] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [DetailAddress, setDetailAddress] = useState("");
  // Modal : Address add
  const [, setResultsModal] = useRecoilState(ResultsModal);
  const [addAddress, setAddAddress] = useRecoilState(InputAddressModal);
  const [, setSearchAddAddress] = useRecoilState(SearchAddressModal);
  // Input 참조 생성
  const addressNameRef = useRef<HTMLInputElement | null>(null);
  const consumerNameRef = useRef<HTMLInputElement | null>(null);
  const phoneNumberRef = useRef<HTMLInputElement | null>(null);
  const DetailAddressRef = useRef<HTMLInputElement | null>(null);

  // ** scroll 방지 hook
  useModalScroll({ isOpen: addAddress.isOpen });
  // 전화번호 입력 제한
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = e.target.value.replace(/[^0-9]/g, "");

    if (numericValue.length <= 11) setPhoneNumber(numericValue);
  };
  const isSaveButtonDisabled = !(
    addressName.trim() &&
    consumer.trim() &&
    phoneNumber.trim() &&
    DetailAddress.trim()
  );
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addAddressDB({
        addressName,
        consumer,
        phoneNumber,
        detailAddress: search, // search가 메인주소
        detailInfo: DetailAddress, // DetailAddress가 상세주소
      });
      setResultsModal({ isOpen: true, type: "SuccessAddAddresModal" });
    } catch (error) {
      openError("RefError");
    }
  };

  // 입력 필드 리셋
  const resetField =
    (setter: React.Dispatch<React.SetStateAction<string>>) => () => {
      setter(""); // 이 setter가 string 값을 받아서 리셋
    };

  const inputFields = [
    {
      label: "최대 7글자까지 자유롭게 수정가능",
      title: "배송지명",
      value: addressName,
      setter: setAddressName,
      ref: addressNameRef,
      maxLength: 7,
      type: "text",
    },
    {
      label: "이름을 입력해 주세요.",
      title: "받는분",
      value: consumer,
      setter: setConsumer,
      ref: consumerNameRef,
      type: "text",
    },
    {
      label: "휴대폰번호를 - 없이 입력해 주세요.",
      title: "전화번호",
      value: phoneNumber,
      setter: setPhoneNumber,
      ref: phoneNumberRef,
      type: "tel",
      maxLength: 11,
      onChange: handleInputChange,
    },
  ];

  return (
    <Modal
      state={addAddress}
      setModalState={setAddAddress}
      name="주소 추가 모달"
      type="add"
    >
      <AddressInfoInputModal.Body>
        <CloseBtn
          name="모달 닫기 버튼"
          setModalState={setAddAddress}
          type="add"
          ButtonComponent={
            <button className={styles.closeBtn}>
              <IoIosClose />
            </button>
          }
        />
        <AddressInfoInputModal.Title />
        <AddressInfoInputModal.InputContents
          InputFields={inputFields}
          onReset={resetField} // 여기서 onReset에 setter만 전달
        />
        <AddressInfoInputModal.SearchModalTrigger
          setModal={setSearchAddAddress}
        />
        <AddressInfoInputModal.DetailAddress
          search={search}
          Detail={DetailAddress}
          setDetailAddress={setDetailAddress}
          ref={DetailAddressRef}
        />
        <AddressInfoInputModal.SaveBtn
          onClick={handleSubmit}
          Disabled={isSaveButtonDisabled}
        />
      </AddressInfoInputModal.Body>
    </Modal>
  );
};

AddressInfoInputModal.Body = ({ children }) => (
  <div className={styles.modalContent}>{children}</div>
);

AddressInfoInputModal.Title = () => (
  <TitleTag classNames={styles.title} level={2}>
    배송지 추가
  </TitleTag>
);

AddressInfoInputModal.InputContents = ({ InputFields, onReset }) => (
  <>
    {InputFields.map((field, index) => (
      <Info
        key={index}
        className={styles.FocusInfo}
        name={`${field.title} 입력구간`}
        InfoTitle={<h3>{field.title}</h3>}
        InfoContents={
          <Input
            label={field.label}
            value={field.value}
            onChange={
              field.onChange
                ? field.onChange // 전화번호는 별도 핸들러
                : (e) => field.setter(e.target.value)
            }
            maxLength={field.maxLength}
            type={field.type}
            ref={field.ref}
            endContent={
              field.value.length > 0 && (
                <LinkIcon
                  value="Icosn"
                  ButtonIcons={<MdOutlineCancel />}
                  className={styles.closeButton}
                  onClick={() => onReset(field.setter)()} // 여기 수정!
                />
              )
            }
          />
        }
      />
    ))}
  </>
);

AddressInfoInputModal.SearchModalTrigger = ({ setModal }) => (
  <ModalTrigger
    ButtonComponent={
      <button className={styles.addressBtn}>
        <SearchIcons />
        주소찾기
      </button>
    }
    setModalState={setModal}
    type="SearchAddressModal"
    name="주소찾기 모달"
  />
);

AddressInfoInputModal.DetailAddress = ({
  search,
  Detail,
  setDetailAddress,
  ref,
}) => (
  <>
    {search.length > 0 && (
      <>
        <span>주소 : {search}</span>
        <Info
          className={styles.FocusInfo}
          name={`상세주소 입력구간`}
          InfoTitle={<h3>상세주소</h3>}
          InfoContents={
            <Input
              value={Detail}
              onChange={(e) => setDetailAddress(e.target.value)}
              ref={ref}
              label={"상세주소를 입력해주세요"}
              endContent={
                Detail.length > 0 && (
                  <LinkIcon
                    value="Icosn"
                    ButtonIcons={<MdOutlineCancel />}
                    className={styles.closeButton}
                  />
                )
              }
            />
          }
        />
      </>
    )}
  </>
);

AddressInfoInputModal.SaveBtn = ({ onClick, Disabled }) => (
  <button
    type="submit"
    className={`${styles.CommentBtn} ${Disabled ? styles.buttonDisabled : styles.buttonActive}`}
    onClick={onClick}
    disabled={Disabled}
  >
    저장
  </button>
);
AddressInfoInputModal.Body.displayName = "AddressInfoInputModal.Body";
AddressInfoInputModal.Title.displayName = "AddressInfoInputModal.Title";
AddressInfoInputModal.InputContents.displayName =
  "AddressInfoInputModal.InputContents";
AddressInfoInputModal.SearchModalTrigger.displayName =
  "AddressInfoInputModal.SearchModalTrigger";
AddressInfoInputModal.DetailAddress.displayName =
  "AddressInfoInputModal.DetailAddress";
AddressInfoInputModal.SaveBtn.displayName = "AddressInfoInputModal.SaveBtn";

export default AddressInfoInputModal;
