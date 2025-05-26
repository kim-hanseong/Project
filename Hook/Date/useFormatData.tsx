//* Hook : Date 번환 년 월 일 ## *
export const useFormatDate = (dateString: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return new Date(dateString).toLocaleDateString(undefined, options);
};
