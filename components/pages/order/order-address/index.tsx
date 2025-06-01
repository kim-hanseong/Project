import { useRecoilState } from "recoil";
import { AiFillEnvironment } from "react-icons/ai";

import styles from "./index.module.css";

import { AddressType, ModalStateType } from "@/types";
import { PencilIcons } from "@/public/svg/Pencil-icons";
import ModalTrigger from "@/components/common/Modal/ModalTrigger";
import RePlaceTag from "@/components/common/RePlaceTag";
import TitleTag from "@/components/common/TitleTag";
import { OnOffModal } from "@/components/Recoil/Modal/OnOffModal/atom";
import Info from "@/components/common/Info";
import FlexBox from "@/components/common/FlexBox";

interface ReviewInfoProps {
  address: AddressType[];
}
// OrderAddress 컴포넌트
const OrderAddress: React.FC<ReviewInfoProps> & {
  Title: React.FC;
  AddressInfo: React.FC<{
    address: AddressType[];
    setModal: React.Dispatch<React.SetStateAction<ModalStateType>>;
  }>;
  EmptyWrap: React.FC<{
    setModal: React.Dispatch<React.SetStateAction<ModalStateType>>;
  }>;
} = ({ address }) => {
  const [, setModal] = useRecoilState(OnOffModal);

  return (
    <section className={styles.AddressContainer} aria-label="배송지 정보">
      <FlexBox $align="start" $gap={22} $col={true}>
        <OrderAddress.Title />
        {address.length > 0 ? (
          <OrderAddress.AddressInfo address={address} setModal={setModal} />
        ) : (
          <OrderAddress.EmptyWrap setModal={setModal} />
        )}
      </FlexBox>
    </section>
  );
};

// 서브 컴포넌트 정의

// 제목
OrderAddress.Title = () => (
  <TitleTag level={3} classNames={styles.title}>
    배송지 정보
  </TitleTag>
);

// 주소 정보
OrderAddress.AddressInfo = ({ address, setModal }) => (
  <div
    className={styles.AddressInfo}
    role="region"
    aria-label="배송지 상세 정보"
  >
    <FlexBox $align="flex-start" $gap={5}>
      <Info
        InfoTitle={
          <FlexBox $align="start" $gap={8}>
            <FlexBox $align="center">
              <AiFillEnvironment aria-hidden="true" />
              <span>{address[0].Address}</span>
            </FlexBox>
            <span className={styles.Delivery} aria-label="기본 배송지">
              기본배송지
            </span>
          </FlexBox>
        }
        InfoContents={
          <div>
            <FlexBox $gap={4}>
              <span>{address[0].consumer}</span>
              <span>{address[0].Phone}</span>
            </FlexBox>
            <FlexBox $gap={4}>
              <span>{address[0].addressinfo}</span>
              <span>{address[0].addressdetailinfo}</span>
            </FlexBox>
          </div>
        }
        className={styles.addressName}
        name="주소지 제목"
      />
      <ModalTrigger
        ButtonComponent={
          <button className={styles.changeModal} aria-label="배송지 변경하기">
            변경
          </button>
        }
        setModalState={setModal}
        type="choiceAddress"
        name="배송지 입력 모달"
        UserCheck={true}
      />
    </FlexBox>
  </div>
);

OrderAddress.EmptyWrap = ({ setModal }) => (
  <div className={styles.NoAddress} role="region" aria-label="배송지 등록 안내">
    <RePlaceTag className={styles.emptyWrap}>
      기본 배송지를 등록해주세요
    </RePlaceTag>
    <ModalTrigger
      ButtonComponent={
        <button className={styles.addressBtn} aria-label="배송지 등록하기">
          <PencilIcons aria-hidden="true" />
          배송지 입력
        </button>
      }
      setModalState={setModal}
      type="choiceAddress"
      name="배송지 입력 모달"
      UserCheck={true}
    />
  </div>
);
// displayName 설정
OrderAddress.Title.displayName = "OrderAddress.Title";
OrderAddress.AddressInfo.displayName = "OrderAddress.AddressInfo";
OrderAddress.EmptyWrap.displayName = "OrderAddress.EmptyWrap";

export default OrderAddress;
