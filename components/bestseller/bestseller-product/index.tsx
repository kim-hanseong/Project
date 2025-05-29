//* Product Component *
import { BookDataType } from "@/types";
import Product from "@/container/product/public/Product";
import ColProduct from "@/container/product/public/ColProduct";
import EmptyProduct from "@/components/전역/Empty";

interface ProductProps {
  data: BookDataType[];
  productForm: string;
}

const BestSellerProduct: React.FC<ProductProps> = ({ data, productForm }) => {
  if (!data || data.length === 0) {
    return (
      <EmptyProduct
        className="w-full"
        message="검색된 도서가 없습니다."
        submessage="다른 카테고리나 검색어를 입력해보세요!"
      />
    );
  }

  return (
    <>
      {productForm === "Basis" && <Product book={data} mode="best" />}
      {productForm === "Col" && <ColProduct data={data} />}
    </>
  );
};

export default BestSellerProduct;
