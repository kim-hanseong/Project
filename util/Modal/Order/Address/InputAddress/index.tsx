import { useState } from "react";
import { useRecoilState } from "recoil";
import { RadioGroup, Radio, Input } from "@nextui-org/react";
import { IoIosClose } from "react-icons/io";

import styles from "./index.module.css";

import CloseBtn from "@/components/common/CloseBtn";
import { SearchIcon } from "@/components/icons";
import { useAddressSearch } from "@/Hook/Data/useAddress";
import { SearchAddressModal } from "@/components/Recoil/Modal/AddressModal/atom";
import Modal from "@/components/common/Modal/ModalContainer";
import TitleTag from "@/components/common/TitleTag";
import FlexBox from "@/components/common/FlexBox";
import { AddressType } from "@/types";

interface Search {
  setSearch: (form: string) => void;
}

const AddressInputModal: React.FC<Search> & {
  Body: React.FC<{ children: React.ReactNode }>;
  Title: React.FC;
  Input: React.FC<{
    query: string;
    setQuery: React.Dispatch<React.SetStateAction<string>>;
  }>;
  SelectList: React.FC<{
    data: AddressType[];
    onChange: (name: string) => void;
  }>;
  SelectListEmpty: React.FC<{ Examples: string[] }>;
  SubmitBtn: React.FC<{ onSubmit: () => void; Disabled: boolean }>;
} = ({ setSearch }) => {
  const { searchQuery, setSearchQuery, searchResults } = useAddressSearch();

  const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(true);
  const [selectedAddress, setSelectedAddress] = useState("");

  const [addAddress, setAddAddress] = useRecoilState(SearchAddressModal);

  const handleRadioClick = (address: string) => {
    setSelectedAddress(address);
    setSearchQuery(address);
    setIsSaveButtonDisabled(false);
  };

  const saveClick = () => {
    if (!selectedAddress) return;
    setSearch(selectedAddress);
    setAddAddress({ isOpen: false, type: "SearchAddressModal" });
  };

  const searchExamples = [
    "도로명 + 건물번호(예: 세종로 119)",
    "지역명(동/리) + 번지(예: 종로1)",
    "지역명(동/리) + 건물명(아파트명(예: 한성빌딩)",
  ];

  return (
    <Modal
      state={addAddress}
      setModalState={setAddAddress}
      name="주소 찾기 모달"
      type="SearchAddressModal"
      aria-label="주소 찾기 모달"
      aria-describedby="address-input-modal-description"
    >
      <AddressInputModal.Body
        aria-modal="true"
        aria-label="주소 찾기 모달"
        aria-describedby="address-input-modal-description"
      >
        <span id="address-input-modal-description" className="sr-only">
          주소를 검색하고 선택하는 모달 창입니다. 도로명, 건물명, 또는 지번으로
          검색할 수 있습니다.
        </span>
        <CloseBtn
          name="모달 닫기 버튼"
          setModalState={setAddAddress}
          type="SearchAddressModal"
          ButtonComponent={
            <button
              className={styles.closeBtn}
              aria-label="주소 찾기 모달 닫기"
            >
              <IoIosClose aria-hidden="true" />
            </button>
          }
        />
        <FlexBox $col={true} className="w-full">
          <AddressInputModal.Title />
          <AddressInputModal.Input
            query={searchQuery}
            setQuery={setSearchQuery}
          />
          <RadioGroup aria-label="주소 선택 목록">
            {searchResults && searchResults.length > 0 ? (
              <AddressInputModal.SelectList
                data={searchResults}
                onChange={handleRadioClick}
              />
            ) : (
              <AddressInputModal.SelectListEmpty Examples={searchExamples} />
            )}
          </RadioGroup>
        </FlexBox>
        <AddressInputModal.SubmitBtn
          onSubmit={saveClick}
          Disabled={isSaveButtonDisabled}
        />
      </AddressInputModal.Body>
    </Modal>
  );
};

AddressInputModal.Body = ({ children }) => (
  <div className={styles.modalContent}>{children}</div>
);
AddressInputModal.Title = () => (
  <TitleTag classNames={styles.title} level={2}>
    주소찾기
  </TitleTag>
);
AddressInputModal.Input = ({ query, setQuery }) => (
  <Input
    startContent={
      <SearchIcon className={styles.searchIcons} aria-hidden="true" />
    }
    label="Search"
    type="text"
    onChange={(e) => setQuery(e.target.value)}
    value={query}
    className={styles.inputField}
    aria-label="주소 검색"
    aria-required="true"
  />
);
AddressInputModal.SelectList = ({ data, onChange }) => (
  <>
    {data.map((result, index) => (
      <div key={index} className="border-1 p-3">
        <Radio
          value={result.address_name}
          onClick={() => onChange(result.address_name)}
          aria-label={`${result.address_name || "주소 이름: null"} 선택`}
        >
          {result.address_name || "주소 이름: null"}
        </Radio>
      </div>
    ))}
  </>
);
AddressInputModal.SelectListEmpty = ({ Examples }) => (
  <div className={styles.AddressSearchInfo}>
    <TitleTag classNames={styles.title} level={2}>
      도로명, 건물명, 또는 지번 중 편한 방법으로 검색하세요
    </TitleTag>
    <ol>
      {Examples.map((example, index) => (
        <li key={index}>{example}</li>
      ))}
    </ol>
  </div>
);
AddressInputModal.SubmitBtn = ({ onSubmit, Disabled }) => (
  <button
    type="submit"
    className={`${styles.CommentBtn} ${
      Disabled ? styles.buttonDisabled : styles.buttonActive
    }`}
    disabled={Disabled}
    onClick={onSubmit}
    aria-disabled={Disabled}
    aria-label="선택한 주소 저장"
  >
    저장
  </button>
);

AddressInputModal.Body.displayName = "AddressInputModal.Body";
AddressInputModal.Title.displayName = "AddressInputModal.Title";
AddressInputModal.Input.displayName = "AddressInputModal.Input";
AddressInputModal.SelectList.displayName = "AddressInputModal.SelectList";
AddressInputModal.SelectListEmpty.displayName =
  "AddressInputModal.SelectListEmpty";
AddressInputModal.SubmitBtn.displayName = "AddressInputModal.SubmitBtn";

export default AddressInputModal;
