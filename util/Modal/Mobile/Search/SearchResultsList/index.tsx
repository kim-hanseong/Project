import styles from "./index.module.css";
import FlexBox from "@/components/common/FlexBox";
import { Thumbnail } from "@/components/common/product/Thumbnail";
import { BookDataType } from "@/types";
import { Title } from "@/components/common/product/Title";
import { AuthList } from "@/components/common/product/AuthList";
import { CustomPrice } from "@/components/common/product/Price";

interface ProductProps {
  data: BookDataType[];
}

const SearchResultsList: React.FC<ProductProps> = ({ data }) => {
  // const [data, setData] = useState<BookDataType[]>([]);

  return (
    <div role="list" aria-label="검색 결과 도서 목록">
      {data.slice(0, 3).map((book, index) => (
        <div
          className={styles.ProductTool}
          key={index}
          role="listitem"
          aria-label={`${book.title} 도서 정보`}
        >
          <FlexBox $justify="space-between">
            <FlexBox $gap={16}>
              <div role="img" aria-label={`${book.title} 표지 이미지`}>
                <Thumbnail data={book} className={styles.thumbnail} />
              </div>
              <FlexBox
                $col={true}
                $gap={4}
                $justify="center"
                role="group"
                aria-label="도서 상세 정보"
              >
                <Title data={book} className={styles.title} />
                <AuthList data={book} className={styles.authors} />
                <FlexBox
                  $align="items-start"
                  $col
                  role="group"
                  aria-label="도서 가격 정보"
                >
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
  );
};

export default SearchResultsList;
