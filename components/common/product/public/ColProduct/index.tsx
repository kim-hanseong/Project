//* Product Component *
import { AiFillApple } from "react-icons/ai";

import styles from "./index.module.css";

import { Title } from "@/components/common/product/Title";
import { Thumbnail } from "@/components/common/product/Thumbnail";
import { AuthList } from "@/components/common/product/AuthList";
import { Comments } from "@/components/common/product/Commet";
import { Rating } from "@/components/common/product/Rating";
//* icons *
import { ChatIcon } from "@/public/svg/Chat-icons";
//* type *
import { BookDataType } from "@/types";
//* styles *
import FlexBox from "@/components/common/FlexBox";
import { Tag } from "@/components/common/product/Tag";

interface ProductProps {
  data: BookDataType[];
}

interface BookBase {
  book: BookDataType;
}

const ColProduct: React.FC<ProductProps> = ({ data }) => {
  return (
    <div
      className={styles.ColProductContainer}
      role="list"
      aria-label="세로형 상품 목록"
    >
      {data?.length > 0 &&
        data
          .filter((book) => book.thumbnail)
          .map((book, index) => (
            <InfoSection key={`${book.title}-${index}`} book={book} />
          ))}
    </div>
  );
};

const InfoSection: React.FC<BookBase> = ({ book }) => (
  <div
    className={styles.ColProductTool}
    role="listitem"
    aria-label={`${book.title} 상품 정보`}
  >
    <FlexBox $col={true} className="h-full">
      <div
        className={styles.thumbnailBox}
        role="img"
        aria-label={`${book.title} 표지 이미지`}
      >
        <Thumbnail data={book} className={styles.Colthumbnail} />
      </div>
      <FlexBox $gap={3} $col $align="start" className={styles.Info}>
        <Tag data={book} className={styles.tag} />
        <FlexBox
          $align="start"
          $justify="start"
          $col
          className={styles.ColTool}
        >
          <Title data={book} className={styles.Coltitle} />
          <AuthList data={book} className={styles.Colauthors} />
        </FlexBox>
        <RatingComponent book={book} />
      </FlexBox>
    </FlexBox>
  </div>
);

const RatingComponent: React.FC<BookBase> = ({ book }) => (
  <FlexBox
    $align="center"
    $justify="start"
    $gap={6}
    className={styles.ColRatingTool}
    role="group"
    aria-label="평점 및 댓글"
  >
    <Rating
      Icon={<AiFillApple color="red" aria-hidden="true" />}
      data={book}
      className={styles.comment}
    />
    <Comments Icon={ChatIcon} data={book} className={styles.comment} />
  </FlexBox>
);

export default ColProduct;
