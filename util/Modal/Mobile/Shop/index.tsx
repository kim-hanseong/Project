import { useRecoilState } from "recoil";

import styles from "./index.module.css";

import Modal from "@/components/common/Modal/ModalContainer";
import { OnOffModal } from "@/components/Recoil/Modal/OnOffModal/atom";
import { useShopList } from "@/Hook/Data/useShopList";
import FlexBox from "@/components/common/FlexBox";
import { Thumbnail } from "@/components/common/product/Thumbnail";
import { Title } from "@/components/common/product/Title";
import { AuthList } from "@/components/common/product/AuthList";
import { CustomPrice } from "@/components/common/product/Price";
import TitleTag from "@/components/common/TitleTag";

const ShopListModal = () => {
  const [modal, setModal] = useRecoilState(OnOffModal);
  const { shopList } = useShopList();

  return (
    <Modal
      state={modal}
      setModalState={setModal}
      type="MobileShopListModal"
      name="찜 목록"
    >
      <div className={styles.Container}>
        <TitleTag level={3}>장바구니</TitleTag>
        {shopList.map((book, index) => (
          <div className={styles.ProductTool} key={index}>
            <FlexBox $justify="space-between">
              <FlexBox $gap={16}>
                <Thumbnail data={book} className={styles.thumbnail} />
                <FlexBox $col={true} $gap={4} $justify="center">
                  <Title data={book} className={styles.title} />
                  <AuthList data={book} className={styles.authors} />
                  <FlexBox $align="items-start" $col>
                    <CustomPrice
                      data={book}
                      Tool={styles.PriceTool}
                      DisCount={styles.PricePercentage}
                      SalePrice={styles.SalePrice}
                      Price={styles.Price}
                    />
                  </FlexBox>
                </FlexBox>
              </FlexBox>
            </FlexBox>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default ShopListModal;
