import { FaMinus, FaPlus } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { AiFillApple } from "react-icons/ai";

import FlexBox from "../../../FlexBox";

import styles from "./index.module.css";

import { useFormatPrice } from "@/Hook/Date/useFormatPrice";
import { BookDataType } from "@/types";
import { Thumbnail } from "@/components/common/product/Thumbnail";
import { Title } from "@/components/common/product/Title";
import { AuthList } from "@/components/common/product/AuthList";
import { CustomPrice } from "@/components/common/product/Price";
import { AddButton, MobileAddButton } from "@/components/common/Button/AddBtn";
import { Comments } from "@/components/common/product/Commet";
import { ChatIcon } from "@/public/svg/Chat-icons";
import { Rating } from "@/components/common/product/Rating";
import { BuyButton, MobileBuyButton } from "@/components/common/Button/BuyBtn";
import { useMediaQuery } from "@/Hook/Responsive/useMediaQuery";

interface ProductProps {
  book: BookDataType[];
  mode: "cart" | "order" | "best" | "Mypage";
  numbers?: Record<string, number>;
  handleIncrease?: (id: number) => void;
  handleDecrease?: (id: number) => void;
  handleDelete?: (id: number) => void;
}

interface BookBase {
  book: BookDataType;
  isMobile?: boolean;
}

interface BookWithQuantity extends BookBase {
  quantity: number;
}

interface BookControlProps extends BookWithQuantity {
  isMobile?: boolean;
  onIncrease: () => void;
  onDecrease: () => void;
  onDelete: () => void;
}

const Product: React.FC<ProductProps> = ({
  book,
  mode,
  handleIncrease,
  handleDecrease,
  handleDelete,
  numbers,
}) => {
  const safeNumbers = numbers ?? {};
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div className={styles.Container} role="list" aria-label="상품 목록">
      {book.map((item, index) => (
        <InfoSection
          isMobile={isMobile}
          key={`${item.title}-${index}`}
          book={item}
          quantity={safeNumbers[item.id] ?? 1}
          mode={mode}
          onIncrease={() => (handleIncrease ? handleIncrease(item.id) : null)}
          onDecrease={() => (handleDecrease ? handleDecrease(item.id) : null)}
          onDelete={() =>
            handleDelete && item.id !== undefined ? handleDelete(item.id) : null
          }
        />
      ))}
    </div>
  );
};

const InfoSection: React.FC<
  BookControlProps & { mode: ProductProps["mode"] }
> = ({ book, quantity, mode, onIncrease, onDecrease, onDelete, isMobile }) => (
  <FlexBox
    $gap={16}
    $align="center"
    className={styles.ProductTool}
    role="listitem"
  >
    <Thumbnail data={book} className={styles.thumbnail} />
    <FlexBox
      $col
      $gap={4}
      $justify="space-between"
      $wrap="wrap"
      className={styles.InfoWrap}
    >
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
      {mode === "best" && <RatingComponent book={book} />}
    </FlexBox>
    <ModeUtil
      isMobile={isMobile}
      mode={mode}
      book={book}
      quantity={quantity}
      onIncrease={onIncrease}
      onDecrease={onDecrease}
      onDelete={onDelete}
    />
  </FlexBox>
);

const ModeUtil: React.FC<BookControlProps & { mode: ProductProps["mode"] }> = ({
  mode,
  isMobile,
  ...props
}) => {
  switch (mode) {
    case "cart":
      return <CartUtill {...props} />;
    case "order":
      return <OrderUtill book={props.book} quantity={props.quantity} />;
    case "best":
      return <BestUill book={props.book} isMobile={isMobile} />;
    case "Mypage":
      return <MyPageUtill book={props.book} quantity={props.quantity} />;
    default:
      return null;
  }
};

const BestUill: React.FC<BookBase> = ({ book, isMobile }) => (
  <FlexBox
    $justify="space-between"
    $col
    $align="center"
    $gap={4}
    className={styles.InfoTool}
  >
    {isMobile ? (
      <MobileAddButton data={book} className={styles.MobileAddBtn} />
    ) : (
      <AddButton data={book} className={styles.AddBtn} />
    )}
    {isMobile ? (
      <MobileBuyButton data={book} className={styles.MobileBuyBtn} />
    ) : (
      <BuyButton data={book} className={styles.BuyBtn} />
    )}
  </FlexBox>
);

const CartUtill: React.FC<BookControlProps> = ({
  book,
  quantity,
  onIncrease,
  onDecrease,
  onDelete,
}) => {
  const price = useFormatPrice(book.sale_price * quantity);

  return (
    <FlexBox $justify="center" $col $align="center">
      <span className={styles.price} aria-label={`총 가격: ${price}원`}>
        {price}원
      </span>
      <FlexBox
        $align="center"
        $gap={0}
        className={styles.NumberContainer}
        role="group"
        aria-label="수량 조절"
      >
        <button
          className={styles.QuantityButton}
          onClick={onDecrease}
          aria-label="수량 감소"
        >
          <FaMinus aria-hidden="true" />
        </button>
        <button
          className={styles.Quantity}
          aria-label={`현재 수량: ${quantity}개`}
        >
          {quantity}
        </button>
        <button
          className={styles.QuantityButton}
          onClick={onIncrease}
          aria-label="수량 증가"
        >
          <FaPlus aria-hidden="true" />
        </button>
      </FlexBox>
      <button
        className={styles.CloseBtn}
        onClick={onDelete}
        aria-label="상품 삭제"
      >
        <IoClose aria-hidden="true" />
      </button>
    </FlexBox>
  );
};

const OrderUtill: React.FC<BookWithQuantity> = ({ book, quantity }) => {
  const price = useFormatPrice(book.sale_price * quantity);

  return (
    <FlexBox $justify="center" $col $align="center">
      <span className={styles.price} aria-label={`총 가격: ${price}원`}>
        {price}원
      </span>
      <FlexBox $align="center">
        <span
          className={styles.MyPageQuantity}
          aria-label={`주문 수량: ${quantity}개`}
        >
          {quantity}
        </span>
      </FlexBox>
    </FlexBox>
  );
};

const MyPageUtill: React.FC<BookWithQuantity> = ({ book }) => {
  const price = useFormatPrice(book.sale_price * book.numbering);

  return (
    <FlexBox
      $justify="center"
      $col
      $align="center"
      className={styles.MyPageContainer}
    >
      <span className={styles.MyPagePrice} aria-label={`총 가격: ${price}원`}>
        {price}원
      </span>
      <div
        className={styles.MyPageQuantity}
        aria-label={`주문 수량: ${book.numbering}개`}
      >
        수량: {book.numbering}개
      </div>
      <div
        className={`${styles.MyPageDelivery} ${book.delivery ? styles.complete : styles.pending}`}
        role="status"
        aria-label={book.delivery ? "배달 완료" : "배송중"}
      >
        {book.delivery ? <span>배달 완료</span> : <span>배송중</span>}
      </div>
    </FlexBox>
  );
};

const RatingComponent: React.FC<BookBase> = ({ book }) => (
  <FlexBox $align="center" $gap={4} role="group" aria-label="평점 및 댓글">
    <Rating
      Icon={<AiFillApple color="red" aria-hidden="true" />}
      data={book}
      className={styles.comment}
    />
    <Comments Icon={ChatIcon} data={book} className={styles.comment} />
  </FlexBox>
);

export default Product;
