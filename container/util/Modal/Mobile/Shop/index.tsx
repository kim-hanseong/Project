import { useRecoilState } from "recoil";

import Modal from "@/components/전역/Modal/ModalContainer";
import { OnOffModal } from "@/components/Recoil/Modal/OnOffModal/atom";
import styles from "@/container/util/Modal/Mobile/Shop/index.module.css";
import { useShopList } from "@/Hook/Data/useShopList";
import FlexBox from "@/components/전역/FlexBox";
import { Thumbnail } from "@/container/product/Thumbnail";
import { Title } from "@/container/product/Title";
import { AuthList } from "@/container/product/AuthList";
import { CustomPrice } from "@/container/product/Price";
import TitleTag from "@/components/전역/TitleTag";

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
