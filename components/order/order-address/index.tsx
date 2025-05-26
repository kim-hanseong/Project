import { useRecoilState } from "recoil";
import { AiFillEnvironment } from "react-icons/ai";

import { AddressType, ModalStateType } from "@/types";
import styles from "@/components/order//order-address/index.module.css";
import { PencilIcons } from "@/public/svg/Pencil-icons";
import ModalTrigger from "@/components/전역/Modal/ModalTrigger";
import RePlaceTag from "@/components/전역/RePlaceTag";
import TitleTag from "@/components/전역/TitleTag";
import { OnOffModal } from "@/components/Recoil/Modal/OnOffModal/atom";
import Info from "@/components/전역/Info";
import FlexBox from "@/components/전역/FlexBox";

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
    <div className={styles.AddressContainer}>
      <FlexBox $align="start" $gap={22} $col={true}>
        <OrderAddress.Title />
        {address.length > 0 ? (
          <OrderAddress.AddressInfo address={address} setModal={setModal} />
        ) : (
          <OrderAddress.EmptyWrap setModal={setModal} />
        )}
      </FlexBox>
    </div>
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
  <div className={styles.AddressInfo}>
    <FlexBox $align="flex-start" $gap={5}>
      <Info
        InfoTitle={
          <FlexBox $align="start" $gap={8}>
            <FlexBox $align="center">
              <AiFillEnvironment />
              <span>{address[0].Address} </span>
            </FlexBox>
            <span className={styles.Delivery}>기본배송지</span>
          </FlexBox>
        }
        InfoContents={
          <div>
            <FlexBox $gap={4}>
              <span>{address[0].consumer}</span>
              <span> {address[0].Phone}</span>
            </FlexBox>
            <FlexBox $gap={4}>
              <span>{address[0].addressinfo}</span>
              <span> {address[0].addressdetailinfo}</span>
            </FlexBox>
          </div>
        }
        className={styles.addressName}
        name="주소지 제목"
      />
      <ModalTrigger
        ButtonComponent={<button className={styles.changeModal}>변경</button>}
        setModalState={setModal}
        type="choiceAddress"
        name="배송지 입력 모달"
        UserCheck={true}
      />
    </FlexBox>
  </div>
);

OrderAddress.EmptyWrap = ({ setModal }) => (
  <div className={styles.NoAddress}>
    <RePlaceTag className={styles.emptyWrap}>
      기본 배송지를 등록해주세요
    </RePlaceTag>
    <ModalTrigger
      ButtonComponent={
        <button className={styles.addressBtn}>
          <PencilIcons />
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
