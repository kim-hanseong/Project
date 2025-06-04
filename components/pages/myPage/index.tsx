import { useState } from "react";

import Componenet from "../../common/컴포넌트구별/Component";
import MobileNavBarComponent from "../../common/컴포넌트구별/MobileNavBar";
import MobileNavbar from "../../layout/Mobile/NavBar";
import BestSellerMobileBottom from "../../layout/Mobile/Bottom";
import Product from "../../common/product/public/Product";
import EmptyProduct from "../../common/Empty";

import { useMyPage } from "./Hook/useMyPage";
import UserInfo from "./myPage-Info/UserInfo";

import { useMediaQuery } from "@/Hook/Responsive/useMediaQuery";
import { useShopList } from "@/Hook/Data/useShopList";
import { useRequireAuth } from "@/Hook/Data/useRequireAuth";

function MyPage() {
  const { orderList, orderNumbers } = useMyPage();
  const { shopList, numbers } = useShopList();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [activeList, setActiveList] = useState<"Order" | "Shop">("Order");

  const currentList = activeList === "Order" ? orderList : shopList;
  const currentNumbers = activeList === "Order" ? orderNumbers : numbers;

  //* LoginCheck
  useRequireAuth();

  return (
    <>
      <MobileNavBarComponent>
        {isMobile && <MobileNavbar mode="Base" Title="마이 페이지" />}
        {isMobile && <BestSellerMobileBottom />}
      </MobileNavBarComponent>

      <UserInfo
        wishlistCount={shopList.length}
        orderCount={orderList.length}
        activeList={activeList}
        onListChange={setActiveList}
      />
      <Componenet>
        {currentList.length > 0 ? (
          <Product
            mode={activeList === "Order" ? "Mypage" : "order"}
            book={currentList}
            numbers={currentNumbers}
          />
        ) : (
          <EmptyProduct
            message={`${activeList === "Order" ? "주문" : "찜한"} 결과가 존재하지 않습니다.`}
          />
        )}
      </Componenet>
    </>
  );
}

export default MyPage;
