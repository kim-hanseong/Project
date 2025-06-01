//* Hook *
import { CiHeart } from "react-icons/ci";

import { useBuy } from "../Hook/useBuyToCart";

import { BookDataType } from "@/types";
import { useLoginCheck } from "@/Hook/Data/useUserCheck";
import LinkIcon from "@/components/common/Link-Icons";

/**
 * 바로구매 버튼입니다 장바구니에 추가 후 구매페이지로 이동하는 버튼입니다.
 *
 * @param {data} data -- Data를 구매에 추가합니다
 * @param {classNames} string -- classNamse 로 전달해 줄 수 있습니다.
 *
 *
 */

export const BuyButton: React.FC<{
  data: BookDataType;
  className: string;
  Mobile?: string;
  counter?: number;
}> = ({ data, className }) => {
  //* 전역 : 로그인 체크 *
  const { handleBuyToCart } = useBuy();

  return (
    <button
      className={className}
      onClick={() => handleBuyToCart(data)}
      aria-label={`${data.title} 바로 구매`}
    >
      <span>바로구매</span>
    </button>
  );
};

export const MobileBuyButton: React.FC<{
  data: BookDataType | null;
  className: string;
  Mobile?: string;
}> = ({ data, className }) => {
  //* 전역 : 로그인 체크 *
  const { checkLogin } = useLoginCheck(); // 로그인 상태 체크 훅 사용

  if (data === null) {
    return null;
  }
  const handleClick = async (e: BookDataType) => {
    checkLogin();
    const storedCart = localStorage.getItem("cart");
    const cart: BookDataType[] = storedCart ? JSON.parse(storedCart) : [];
    const isDuplicate = cart.some((item) => item.title === e.title);
    const numbering = 1;

    if (!isDuplicate) {
      cart.push({ ...e, numbering });
    } else {
      const updatedCart = cart.map((item) => {
        if (item.title === e.title) {
          return {
            ...item,
            numbering: item.numbering ? item.numbering + 1 : 1,
          }; // numbering 증가
        }

        return item; // 변경되지 않은 항목은 그대로 반환
      });

      localStorage.setItem("cart", JSON.stringify(updatedCart));

      return;
    }

    //  else {
    //     return { ...item, numbering: item.numbering ? item.numbering + 1 : 1 };
    //   }

    // localStorage에 updatedData 저장
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  return (
    <LinkIcon
      aria-label={`${data.title} 바로 구매`}
      value="바로구매"
      className={className}
      ButtonIcons={<CiHeart />}
      onClick={() => handleClick(data)}
    />
  );
};
