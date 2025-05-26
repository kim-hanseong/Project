import styles from "@/container/util/Modal/Mobile/Search/SearchResultsList/index.module.css";
import FlexBox from "@/components/전역/FlexBox";
import { Thumbnail } from "@/container/product/Thumbnail";
import { BookDataType } from "@/types";
import { Title } from "@/container/product/Title";
import { AuthList } from "@/container/product/AuthList";
import { CustomPrice } from "@/container/product/Price";

interface ProductProps {
  data: BookDataType[];
}

const SearchResultsList: React.FC<ProductProps> = ({ data }) => {
  // const [data, setData] = useState<BookDataType[]>([]);

  return (
    <>
      {data.slice(0, 3).map((book, index) => (
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
    </>
  );
};

export default SearchResultsList;
