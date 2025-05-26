🛒 CartProduct 컴포넌트 & useShopList 훅 구조 정리

📌 목적

장바구니 UI 및 상품 수량 상태 관리 로직을 역할에 따라 분리하여 재사용성과 유지보수성을 높이기 위함.

📂 구성 파일 요약

파일

역할

CartProduct.tsx

장바구니 UI를 구성하는 Presentational Component

useShopList.ts

장바구니 상품/수량을 관리하는 커스텀 훅 (상태 로직)

🔁 상태 흐름 요약

로컬 스토리지 ↔ useShopList ↔ CartProduct (props)

useShopList 내부에서:

상품 리스트 (shopList)

수량 객체 (numbers)

수량 증가/감소 함수

상품 삭제, 동기화 함수

CartProduct에서는:

위 상태를 받아 UI를 렌더링

버튼 클릭 시 함수 실행

💡 핵심 포인트

역할 분리: 화면 렌더는 CartProduct, 상태 관리는 useShopList

유지보수 편리성: 수량 변경 로직, 데이터 동기화를 별도로 관리 가능

확장성: 다른 컴포넌트에서도 동일한 로직을 쉽게 사용 가능

🔧 향후 개선 아이디어
뒤로가기나 랜더링에 있어서 numbers 가 바뀐걸 바로 적용시키려면 어려움
비동기라서 바로 적용이 안되고 방법을 어떻게 해야할지 잘 모르겠네.

✨ 사용 예시
const {
shopList,
setShopList,
numbers,
setNumbers,
handleIncrease,
handleDecrease,
handleDelete,
ClickBtn,
handleOrder
} = useShopList();

<CartProduct
  data={shopList}
  setData={setShopList}
  state={numbers}
  setState={setNumbers}
/>

역할 분리: 화면 렌더는 CartProduct, 상태 관리는 useShopList

유지보수 편리성: 수량 변경 로직, 데이터 동기화를 별도로 관리 가능

확장성: 다른 컴포넌트에서도 동일한 로직을 쉽게 사용 가능

🔧 향후 개선 아이디어

주문 완료 후 수량 초기화 기능 추가

수량 0일 경우 자동 삭제 로직 고려

상품 ID 대신 book.title 사용 중 → 고유 ID 사용으로 변경 추천

- [ ] 주문 완료 후 수량 초기화 기능 추가
- [ ] 수량 0일 경우 자동 삭제 로직 고려
