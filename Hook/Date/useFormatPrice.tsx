//* Hook : 가격 쉼표 ## *
export const useFormatPrice = (number: number) => {
  return new Intl.NumberFormat().format(number);
};
