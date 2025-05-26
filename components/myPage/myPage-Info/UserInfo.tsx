import styles from "./UserInfo.module.css";

interface UserInfoProps {
  wishlistCount: number;
  orderCount: number;
  activeList: "Order" | "Shop";
  onListChange: (list: "Order" | "Shop") => void;
}

interface StatItemProps {
  value: number;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

// 메인 컴포넌트 정의
const UserInfo: React.FC<UserInfoProps> & {
  StatsSection: React.FC<{
    stats: { wishlistCount: number; orderCount: number };
    activeList: "Order" | "Shop";
    onListChange: (list: "Order" | "Shop") => void;
  }>;
  StatItem: React.FC<StatItemProps>;
} = ({ wishlistCount, orderCount, activeList, onListChange }) => {
  return (
    <div className={styles.container}>
      <UserInfo.StatsSection
        stats={{ wishlistCount, orderCount }}
        activeList={activeList}
        onListChange={onListChange}
      />
    </div>
  );
};

UserInfo.StatsSection = ({ stats, activeList, onListChange }) => (
  <div className={styles.statsSection}>
    <UserInfo.StatItem
      value={stats.wishlistCount}
      label="찜한 상품"
      isActive={activeList === "Shop"}
      onClick={() => onListChange("Shop")}
    />
    <UserInfo.StatItem
      value={stats.orderCount}
      label="주문 내역"
      isActive={activeList === "Order"}
      onClick={() => onListChange("Order")}
    />
  </div>
);

UserInfo.StatItem = ({ value, label, isActive, onClick }) => (
  <button
    className={`${styles.statItem} ${isActive ? styles.active : ""}`}
    onClick={onClick}
  >
    <span className={styles.statValue}>{value}</span>
    <span className={styles.statLabel}>{label}</span>
  </button>
);

// displayName 설정
UserInfo.displayName = "UserInfo";
UserInfo.StatsSection.displayName = "UserInfo.StatsSection";
UserInfo.StatItem.displayName = "UserInfo.StatItem";

export default UserInfo;
