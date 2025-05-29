import Componenet from "../전역/컴포넌트구별/Component";
import NavBarComponent from "../전역/컴포넌트구별/NavBar";
import MobileNavbar from "../layout/Mobile/NavBar";
import OrderInfoTitle from "../전역/OrderInfoTitle";

import OrderEndWrap from "./orderEnd-Wrap";
import useOrderSubmitEffect from "./Hook/useOrderEnd";

import { useMediaQuery } from "@/Hook/Responsive/useMediaQuery";
import { useRequireAuth } from "@/Hook/Data/useRequireAuth";

function OrderEndPage() {
  useRequireAuth();
  useOrderSubmitEffect();
  const isMobile = useMediaQuery("(max-width: 768px)"); // 👈 모바일 여부 판별

  return (
    <>
      <Componenet>
        <NavBarComponent>
          {isMobile && <MobileNavbar mode="Base" Title="주문/결제" />}
        </NavBarComponent>

        <OrderInfoTitle TitleIndex={3} />
        <OrderEndWrap />
      </Componenet>
    </>
  );
}

export default OrderEndPage;
