import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "./CategoryNav.module.css";

import { useLogout } from "@/Hook/Data/useLogOut";

const CategoryNav = () => {
  const pathname = usePathname();
  const { handleLogout } = useLogout();

  const categories = [
    { name: "베스트", path: "/bestseller" },
    { name: "Top10", path: "/orderSales" },
    { name: "추천", path: "/recommend" },
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
            role="menuitem"
            aria-current={pathname === category.path ? "page" : undefined}
            aria-label={`${category.name} 카테고리로 이동`}
          >
            {category.name}
          </Link>
        ))}
        <button onClick={handleLogout} className={styles.logoutButton}>
          로그아웃
        </button>
      </div>
    </nav>
  );
};

export default CategoryNav;
