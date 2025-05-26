//* Product Component *
import { AiFillApple } from "react-icons/ai";

import styles from "./index.module.css";

import { Title } from "@/container/product/Title";
import { Thumbnail } from "@/container/product/Thumbnail";
import { AuthList } from "@/container/product/AuthList";
import { Comments } from "@/container/product/Commet";
import { Rating } from "@/container/product/Rating";
//* icons *
import { ChatIcon } from "@/public/svg/Chat-icons";
//* type *
import { BookDataType } from "@/types";
//* styles *
import FlexBox from "@/components/전역/FlexBox";
import { Tag } from "@/container/product/Tag";

interface ProductProps {
  data: BookDataType[];
}

interface BookBase {
  book: BookDataType;
}

const ColProduct: React.FC<ProductProps> = ({ data }) => {
  return (
    <div className={styles.ColProductContainer}>
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
  <div className={styles.ColProductTool}>
    <FlexBox $col={true} className="h-full">
      <div className={styles.thumbnailBox}>
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
  >
    <Rating
      Icon={<AiFillApple color="red" />}
      data={book}
      className={styles.comment}
    />
    <Comments Icon={ChatIcon} data={book} className={styles.comment} />
  </FlexBox>
);

export default ColProduct;
