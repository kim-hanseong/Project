import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "./CategoryNav.module.css";

const CategoryNav = () => {
  const pathname = usePathname();

  const categories = [
    { name: "베스트", path: "/bestseller" },
    { name: "Top10", path: "/orderSales" },
    { name: "추천", path: "/recommend" },
    { name: "이벤트", path: "/event" },
  ];

  return (
    <nav className={styles.categoryNav}>
      <div className={styles.categoryContainer}>
        {categories.map((category) => (
          <Link
            key={category.path}
            href={category.path}
            className={`${styles.categoryItem} ${
              pathname === category.path ? styles.active : ""
            }`}
          >
            {category.name}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default CategoryNav;
