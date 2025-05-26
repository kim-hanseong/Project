import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import MobileNavBarComponent from "../전역/컴포넌트구별/MobileNavBar";
import Componenet from "../전역/컴포넌트구별/Component";
import { OnOffModal } from "../Recoil/Modal/OnOffModal/atom";
import FlexBox from "../전역/FlexBox";
import { ResultsModal } from "../Recoil/Modal/ResultModal/atom";
import {
  InputAddressModal,
  SearchAddressModal,
} from "../Recoil/Modal/AddressModal/atom";
import ModalComponenet from "../전역/컴포넌트구별/ModalComponent";
import Product from "../../container/product/public/Product";
import OrderInfoTitle from "../전역/OrderInfoTitle";
import MobileNavbar from "../layout/Mobile/NavBar";

import OrderAddress from "./order-address";

import MobilePriceWrap from "@/container/util/Modal/공용/PriceWrap/Mobile";
import styles from "@/components/order/index.module.css";
import { useMediaQuery } from "@/Hook/Responsive/useMediaQuery";
import SuccessAddAddresModal from "@/container/util/Modal/Order/result/SucessAddAddress";
import { useShopList } from "@/Hook/Data/useShopList";
import { AddressType } from "@/types";
import RecentAddressEditModal from "@/container/util/Modal/Order/result/AddressEdit";
import RecentAddressDeleteModal from "@/container/util/Modal/Order/result/AddressDelete";
import useAddressUserInfo from "@/container/util/Modal/Order/Address/Hook/useAddressInfo";
import ChoiceAddressModal from "@/container/util/Modal/Order/Address/choiceAddress";
import AddressInputModal from "@/container/util/Modal/Order/Address/InputAddress";
import AddressInfoInputModal from "@/container/util/Modal/Order/Address/addAddress";
import TopPriceWrap from "@/container/util/Modal/공용/PriceWrap/DeskTop";
import { useMountLoginCheck } from "@/Hook/Data/useMountLoginCheck";

function OrderPage() {
  useMountLoginCheck();
  const { shopList, numbers, isFetched } = useShopList();
  const { address, recentAddress } = useAddressUserInfo();
  const [search, setSearch] = useState("");

  const [modal] = useRecoilState(OnOffModal);
  const [resultsModal] = useRecoilState(ResultsModal);
  const [addAddress] = useRecoilState(InputAddressModal);
  const [searchaddAddress] = useRecoilState(SearchAddressModal);

  const router = useRouter();

  useEffect(() => {
    if (!isFetched) return; // 아직 데이터 로드 안 됨

    if (shopList.length === 0) {
      alert("장바구니에 상품이 없습니다.");
      router.replace("/cart");
    }
  }, [isFetched, shopList]);

  const MODAL_COMPONENTS: {
    [key: string]: React.FC<{ address: AddressType[] }>;
  } = {
    choiceAddress: ChoiceAddressModal as React.FC<{ address: AddressType[] }>,
  };
  const OrderModalComponent = MODAL_COMPONENTS[modal.type];

  const RESULTS_MODAL_COMPONENTS: {
    [key: string]: React.FC;
  } = {
    RecentAddressEditModal,
    RecentAddressDeleteModal,
    SuccessAddAddresModal,
  };
  const OrderResultsModalComponent =
    RESULTS_MODAL_COMPONENTS[resultsModal.type];
  const isMobile = useMediaQuery("(max-width: 768px)"); // 👈 모바일 여부 판별

  return (
    <>
      <MobileNavBarComponent>
        {isMobile && <MobileNavbar mode="Base" Title="주문/결제" />}
        {isMobile && <MobilePriceWrap data={shopList} state={numbers} />}
      </MobileNavBarComponent>
      <Componenet>
        <OrderInfoTitle TitleIndex={2} />
        <FlexBox $gap={32}>
          <FlexBox $col={true} className={styles.FlexWrap}>
            <OrderAddress address={recentAddress} />
            <Product book={shopList} numbers={numbers} mode="order" />
          </FlexBox>
          <TopPriceWrap data={shopList} state={numbers} />
        </FlexBox>
      </Componenet>
      <ModalComponenet>
        {modal.isOpen && OrderModalComponent && (
          <OrderModalComponent address={address} />
        )}
        {addAddress.isOpen && <AddressInfoInputModal search={search} />}
        {searchaddAddress.isOpen && <AddressInputModal setSearch={setSearch} />}
        {OrderResultsModalComponent && <OrderResultsModalComponent />}
      </ModalComponenet>
    </>
  );
}

export default OrderPage;
