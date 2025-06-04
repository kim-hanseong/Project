import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import MobileNavBarComponent from "../../common/컴포넌트구별/MobileNavBar";
import Componenet from "../../common/컴포넌트구별/Component";
import { OnOffModal } from "../../Recoil/Modal/OnOffModal/atom";
import FlexBox from "../../common/FlexBox";
import { ResultsModal } from "../../Recoil/Modal/ResultModal/atom";
import {
  InputAddressModal,
  SearchAddressModal,
} from "../../Recoil/Modal/AddressModal/atom";
import ModalComponenet from "../../common/컴포넌트구별/ModalComponent";
import Product from "../../common/product/public/Product";
import OrderInfoTitle from "../../common/OrderInfoTitle";
import MobileNavbar from "../../layout/Mobile/NavBar";

import OrderAddress from "./order-address";
import styles from "./index.module.css";

import MobilePriceWrap from "@/util/Modal/공용/PriceWrap/Mobile";
import { useMediaQuery } from "@/Hook/Responsive/useMediaQuery";
import SuccessAddAddresModal from "@/util/Modal/Order/result/SucessAddAddress";
import { useShopList } from "@/Hook/Data/useShopList";
import { AddressType } from "@/types";
import RecentAddressEditModal from "@/util/Modal/Order/result/AddressEdit";
import RecentAddressDeleteModal from "@/util/Modal/Order/result/AddressDelete";
import useAddressUserInfo from "@/util/Modal/Order/Address/Hook/useAddressInfo";
import ChoiceAddressModal from "@/util/Modal/Order/Address/choiceAddress";
import AddressInputModal from "@/util/Modal/Order/Address/InputAddress";
import AddressInfoInputModal from "@/util/Modal/Order/Address/addAddress";
import TopPriceWrap from "@/util/Modal/공용/PriceWrap/DeskTop";
import { useRequireAuth } from "@/Hook/Data/useRequireAuth";

function OrderPage() {
  //* data *
  const { shopList, numbers, isFetched } = useShopList();
  const { address, recentAddress } = useAddressUserInfo();
  const [search, setSearch] = useState("");
  //** modal */
  const [modal] = useRecoilState(OnOffModal);
  const [resultsModal] = useRecoilState(ResultsModal);
  const [addAddress] = useRecoilState(InputAddressModal);
  const [searchaddAddress] = useRecoilState(SearchAddressModal);
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

  useEffect(() => {
    if (!isFetched) return; // 아직 데이터 로드 안 됨

    if (shopList.length === 0) {
      alert("장바구니에 상품이 없습니다.");
      router.replace("/cart");
    }
  }, [isFetched, shopList]);

  const isMobile = useMediaQuery("(max-width: 768px)"); // 👈 모바일 여부 판별
  const router = useRouter();

  //* LoginCheck
  useRequireAuth();

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
