import { useRecoilState } from "recoil";

import Product from "../../container/product/public/Product";
import Componenet from "../전역/컴포넌트구별/Component";
import { OnOffModal } from "../Recoil/Modal/OnOffModal/atom";
import ModalComponenet from "../전역/컴포넌트구별/ModalComponent";
import MobileNavBarComponent from "../전역/컴포넌트구별/MobileNavBar";
import MobileNavbar from "../layout/Mobile/NavBar";
import BestSellerMobileBottom from "../layout/Mobile/Bottom";

import { useOrderSales } from "./Hook/useOrderSales";
import OrderSalesTitle from "./Order-title/OrderSalesTitle";

import ProductShopArlam from "@/container/util/Modal/ShopModal";
import SearchModal from "@/container/util/Modal/Mobile/Search";
import { useMediaQuery } from "@/Hook/Responsive/useMediaQuery";

//* child components *
const OrderSalesrPage: React.FC = () => {
  //** modal */
  const [modal] = useRecoilState(OnOffModal);
  //* Mobile
  const isMobile = useMediaQuery("(max-width: 768px)"); // 👈 모바일 여부 판별

  const MODAL_COMPONENTS: {
    [key: string]: React.FC;
  } = {
    ProductShopExists: ProductShopArlam,
    ProductShopAdd: ProductShopArlam,
    MobileSearchModal: SearchModal,
  };
  const BestsellerModalComponent = MODAL_COMPONENTS[modal.type];

  const { orderSales } = useOrderSales();

  return (
    <>
      <MobileNavBarComponent>
        {isMobile && <MobileNavbar mode="Base" Title="베스트셀러" />}
        {isMobile && <BestSellerMobileBottom />}
      </MobileNavBarComponent>

      <Componenet>
        <OrderSalesTitle />
        <Product book={orderSales} mode="best" />
      </Componenet>

      <ModalComponenet>
        {modal.isOpen && BestsellerModalComponent && (
          <BestsellerModalComponent />
        )}
      </ModalComponenet>
    </>
  );
};

export default OrderSalesrPage;
