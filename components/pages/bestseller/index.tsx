import { useRecoilState } from "recoil";
import { useState } from "react";

import FlexBox from "../../common/FlexBox";
import Componenet from "../../common/컴포넌트구별/Component";
import { OnOffModal } from "../../Recoil/Modal/OnOffModal/atom";
import ModalComponenet from "../../common/컴포넌트구별/ModalComponent";
import MobileNavBarComponent from "../../common/컴포넌트구별/MobileNavBar";
import MobileNavbar from "../../layout/Mobile/NavBar";
import MobileBottom from "../../layout/Mobile/Bottom";

import useBookFetchDataPagenation from "./Hook/useBestBook";
import BestSellerCategor from "./bestseller-Category-Select";
import BestSellerPagiNation from "./bestseller-PagiNation";
import BestSellerPageSize from "./bestseller-PageSize";
import BestSellerSorting from "./bestseller-Sorting";
import styles from "./index.module.css";

import useInfiniteScroll from "@/Hook/Event/useInfiniteScroll";
import ProductShopArlam from "@/util/Modal/ShopModal";
import SearchModal from "@/util/Modal/Mobile/Search";
import { useMediaQuery } from "@/Hook/Responsive/useMediaQuery";
import BestSellerProduct from "./bestseller-Product";
import BestSellerFormChange from "./bestseller-Form-change-btn";
//* data *
const BestSellerPage: React.FC = () => {
  const [productForm, setProductForm] = useState("Basis");
  const {
    data,
    category,
    pageSize,
    pagination,
    sorting,
    setCategory,
    setPageSize,
    setPagination,
    setSorting,
  } = useBookFetchDataPagenation({
    category: "전체",
    pageSize: "10",
    pagination: "1",
    sorting: "추천일순",
  });
  //** modal */
  const [modal] = useRecoilState(OnOffModal);
  const MODAL_COMPONENTS: {
    [key: string]: React.FC;
  } = {
    ProductShopExists: ProductShopArlam,
    ProductShopAdd: ProductShopArlam,
    MobileSearchModal: SearchModal,
  };
  const BestsellerModalComponent = MODAL_COMPONENTS[modal.type];

  //* Mobile
  const isMobile = useMediaQuery("(max-width: 768px)"); // 👈 모바일 여부 판별

  const handlePageSizeChange = () => {
    if (parseInt(pageSize) >= 18) {
      return;
    }
    setPageSize((parseInt(pageSize) + 3).toString());
  };

  // ** scroll Hook
  useInfiniteScroll(100, handlePageSizeChange, 768);

  return (
    <>
      <MobileNavBarComponent>
        {isMobile && <MobileNavbar mode="Base" Title="베스트셀러" />}
        {isMobile && <MobileBottom />}
      </MobileNavBarComponent>

      <Componenet>
        <FlexBox className={styles.Box} $justify="space-between">
          <FlexBox $gap={12}>
            <BestSellerCategor
              productForm={category}
              setProductForm={setCategory}
            />
            <BestSellerPageSize
              productForm={pageSize}
              setProductForm={setPageSize}
            />
          </FlexBox>
          <FlexBox $gap={12}>
            <BestSellerSorting
              productForm={sorting}
              setProductForm={setSorting}
            />
            <BestSellerFormChange
              productForm={productForm}
              setProductForm={setProductForm}
            />
          </FlexBox>
        </FlexBox>
        <BestSellerProduct data={data} productForm={productForm} />
        <FlexBox $justify="center">
          <BestSellerPagiNation
            productForm={pagination}
            setProductForm={setPagination}
          />
        </FlexBox>
      </Componenet>

      <ModalComponenet>
        {modal.isOpen && BestsellerModalComponent && (
          <BestsellerModalComponent />
        )}
      </ModalComponenet>
    </>
  );
};

export default BestSellerPage;
