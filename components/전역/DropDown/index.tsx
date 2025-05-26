// BestSellerDropdown.tsx
import { IoIosArrowUp } from "react-icons/io";

import styles from "./index.module.css";

import PopButton from "@/components/전역/PopButton";

interface BestSellerDropdownProps {
  items: string[];
  displayText: string;
  onSelect: (value: string) => void;
  renderLabel?: (value: string) => string;
  className?: string;
  value?: string; // PopButton 내부 value 표시용
}

const Dropdown: React.FC<BestSellerDropdownProps> = ({
  items,
  displayText,
  onSelect,
  renderLabel,
  className,
  value,
}) => {
  const RenderItems = () => (
    <ul className={styles.SizeTool}>
      {items.map((item) => (
        <li key={item} className={styles.Item}>
          <button className={styles.btn} onClick={() => onSelect(item)}>
            {renderLabel ? renderLabel(item) : item}
          </button>
        </li>
      ))}
    </ul>
  );

  return (
    <PopButton
      value={value ?? displayText}
      className={className ?? styles.TriggerBtn}
      ButtonTrigger={<span>{displayText}</span>}
      ButtonIcons={<IoIosArrowUp />}
      ButtonContent={<RenderItems />}
      down={true}
    />
  );
};

export default Dropdown;
