import { CiShoppingCart } from "react-icons/ci";

import { useAdd } from "../Hook/useAdd";

import { BookDataType } from "@/types";
import LinkIcon from "@/components/전역/Link-Icons";
import { useTest } from "../Hook/useTest";

/**
 * 장바구니에 추가시키는 버튼입니다 중복과 아님을 구분해 Modal 을 나오게합니다.
 *
 * @param {data} data -- Data를 장바구니 데이터에 추가합니다
 * @param {classNames} string -- classNamse 로 전달해 줄 수 있습니다.
 *
 *
 */
// ** 데이터 목록 추가하는 버튼임 ㅇㅇㅇ
export const TestBtn: React.FC<{
  data: BookDataType;
  className: string;
}> = ({ data, className }) => {
  //* 전역 : 로그인 체크 *
  const { handleAddToCart, EBOOKhandleAddToCart } = useTest();

  return (
    <>
      <button className={className} onClick={() => handleAddToCart(data)}>
        <span>국내도서 목록추가</span>
      </button>
      <button className={className} onClick={() => EBOOKhandleAddToCart(data)}>
        <span>EBOOK 목록추가</span>
      </button>
    </>
  );
};
