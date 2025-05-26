//* Product Component *
import { BookDataType } from "@/types";
import Product from "@/container/product/public/Product";
import ColProduct from "@/container/product/public/ColProduct";

interface ProductProps {
  data: BookDataType[];
  productForm: string;
}

const BestSellerProduct: React.FC<ProductProps> = ({ data, productForm }) => {
  return (
    <>
      {productForm === "Basis" && <Product book={data} mode="best" />}
      {productForm === "Col" && <ColProduct data={data} />}
    </>
  );
};

export default BestSellerProduct;
