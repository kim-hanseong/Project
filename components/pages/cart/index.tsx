import Componenet from "../../common/컴포넌트구별/Component";
import FlexBox from "../../common/FlexBox";
import MobileNavBarComponent from "../../common/컴포넌트구별/MobileNavBar";
import Product from "../../common/product/public/Product";
import OrderInfoTitle from "../../common/OrderInfoTitle";
import MobileNavbar from "../../layout/Mobile/NavBar";
import EmptyProduct from "../../common/Empty";

import CartPrecaution from "./cart-Precautions";

import { useShopList } from "@/Hook/Data/useShopList";
import { useMediaQuery } from "@/Hook/Responsive/useMediaQuery";
import TopPriceWrap from "@/util/Modal/공용/PriceWrap/DeskTop";
import MobilePriceWrap from "@/util/Modal/공용/PriceWrap/Mobile";
import { useRequireAuth } from "@/Hook/Data/useRequireAuth";

function CartPage() {
  const { shopList, numbers, handleIncrease, handleDecrease, handleDelete } =
    useShopList();
  const isMobile = useMediaQuery("(max-width: 768px)"); // 👈 모바일 여부 판별

  useRequireAuth();

  return (
    <>
      <MobileNavBarComponent>
        {isMobile && <MobileNavbar mode="Base" Title="장바구니" />}
        {isMobile && <MobilePriceWrap data={shopList} state={numbers} />}
      </MobileNavBarComponent>
      <Componenet>
        <OrderInfoTitle TitleIndex={1} />
        <FlexBox $gap={32} className="mb-12">
          {shopList.length > 0 ? (
            <Product
              book={shopList}
              mode="cart"
              handleIncrease={handleIncrease}
              handleDecrease={handleDecrease}
              handleDelete={handleDelete}
              numbers={numbers}
            />
          ) : (
            <EmptyProduct
              className="w-full"
              message="장바구니에 담긴 상품이 없습니다."
              submessage="마음에 드는 상품을 담아보세요!"
              aria-live="polite"
              aria-label="장바구니가 비어있는 상태"
            />
          )}
          {!isMobile && <TopPriceWrap data={shopList} state={numbers} />}
        </FlexBox>
        <CartPrecaution />
      </Componenet>
    </>
  );
}

export default CartPage;
