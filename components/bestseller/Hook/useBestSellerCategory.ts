import { useState, useEffect } from "react";

export const useBestSellerCategory = (initialCategory: string) => {
  const [category, setCategory] = useState(initialCategory);
  const [bestSellerDB, setBestSellerDB] = useState("best_category_domestic");

  useEffect(() => {
    switch (category) {
      case "전체":
      case "국내도서":
        setBestSellerDB("best_category_domestic");
        break;
      case "외국도서":
        setBestSellerDB("best_category_foreign");
        break;
      case "eBook":
        setBestSellerDB("best_category_eBook");
        break;
      default:
        break;
    }
  }, [category]);

  return {
    category,
    bestSellerDB,
    setCategory,
  };
};
