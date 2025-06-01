import { useRecoilState } from "recoil";

import ModalComponenet from "../../common/컴포넌트구별/ModalComponent";
import Componenet from "../../common/컴포넌트구별/Component";
import { OnOffModal } from "../../Recoil/Modal/OnOffModal/atom";
import Product from "../../common/product/public/Product";
import EmptyProduct from "../../common/Empty";

import SearchListTitle from "./search-title";

import useBookApi from "@/Hook/Data/useBookApi";
import ProductShopArlam from "@/util/Modal/ShopModal";
import SearchModal from "@/util/Modal/Mobile/Search";

function SearchListPage(props: { params: { slug: string } }) {
  // ** Modal
  const decodedString = decodeURIComponent(props.params.slug);
  const [modal] = useRecoilState(OnOffModal);
  const { searchResults } = useBookApi({
    slug: decodedString,
  });

  const MODAL_COMPONENTS: {
    [key: string]: React.FC;
  } = {
    ProductShopExists: ProductShopArlam,
    ProductShopAdd: ProductShopArlam,
    MobileSearchModal: SearchModal,
  };

  const SearchListrModalComponent = MODAL_COMPONENTS[modal.type];

  return (
    <>
      <Componenet>
        <SearchListTitle title={decodedString} />
        {searchResults.length > 0 ? (
          <Product book={searchResults} mode="best" />
        ) : (
          <EmptyProduct message="검색결과가 존재하지 않습니다." />
        )}
      </Componenet>
      <ModalComponenet>
        {modal.isOpen && SearchListrModalComponent && (
          <SearchListrModalComponent />
        )}
      </ModalComponenet>
    </>
  );
}

export default SearchListPage;
