import { CiShoppingCart } from "react-icons/ci";

import { useAdd } from "../Hook/useAdd";

import { BookDataType } from "@/types";
import LinkIcon from "@/components/common/Link-Icons";

/**
 * 장바구니에 추가시키는 버튼입니다 중복과 아님을 구분해 Modal 을 나오게합니다.
 *
 * @param {data} data -- Data를 장바구니 데이터에 추가합니다
 * @param {classNames} string -- classNamse 로 전달해 줄 수 있습니다.
 *
 *
 */

export const AddButton: React.FC<{
  data: BookDataType;
  className: string;
  Mobile?: string;
  counter?: number;
}> = ({ data, className }) => {
  //* 전역 : 로그인 체크 *
  const { handleAddToCart } = useAdd();

  return (
    <button
      className={className}
      onClick={() => handleAddToCart(data)}
      aria-label={`${data.title} 장바구니에 추가`}
    >
      <span>장바구니</span>
    </button>
  );
};

export const MobileAddButton: React.FC<{
  data: BookDataType;
  className: string;
  Mobile?: string;
}> = ({ data, className }) => {
  const { handleAddToCart } = useAdd();

  return (
    <LinkIcon
      aria-label={`${data.title} 장바구니에 추가`}
      value="장바구니"
      className={className}
      ButtonIcons={<CiShoppingCart />}
      onClick={() => handleAddToCart(data)}
    />
  );
};
