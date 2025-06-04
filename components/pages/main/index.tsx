import { useCallback } from "react";

import Componenet from "../../common/컴포넌트구별/Component";
import MobileNavBarComponent from "../../common/컴포넌트구별/MobileNavBar";
import MobileNavbar from "../../layout/Mobile/NavBar";
import useBookFetchDataPagenation from "../bestseller/Hook/useBestBook";
import { useOrderSales } from "../orderSales/Hook/useOrderSales";

import MainHero from "./main-hero";
import MainBestSlide from "./main-best";

import { useMediaQuery } from "@/Hook/Responsive/useMediaQuery";

function MainPage() {
  //* data *
  const { data, category, setCategory, isLoading } = useBookFetchDataPagenation(
    {
      category: "전체",
      pageSize: "10",
      pagination: "1",
      sorting: "추천일순",
    }
  );
  const { orderSales } = useOrderSales();
  const handleCategoryChange = useCallback(
    (newCategory: string) => {
      setCategory(newCategory);
    },
    [setCategory]
  );
  //* Mobile
  const isMobile = useMediaQuery("(max-width: 768px)"); // 👈 모바일 여부 판별

  return (
    <>
      <MobileNavBarComponent>
        {isMobile && <MobileNavbar mode="Base" Title="장바구니" />}
      </MobileNavBarComponent>
      <Componenet>
        <MainHero />
        <MainBestSlide
          mode="best"
          data={data}
          name="슬라이드"
          onCategoryChange={handleCategoryChange}
          currentCategory={category}
          loading={isLoading}
        />
        <MainBestSlide
          mode="top"
          data={orderSales}
          name="슬라이드"
          onCategoryChange={handleCategoryChange}
          currentCategory={category}
          loading={isLoading}
        />
        {/* <MainSales data={orderSales} /> */}
      </Componenet>
    </>
  );
}

export default MainPage;
