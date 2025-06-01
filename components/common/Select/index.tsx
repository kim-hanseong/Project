import React from "react";
import { IoIosArrowUp } from "react-icons/io";

import styles from "./index.module.css"; // 공통 스타일로 바꿔

import PopButton from "@/components/common/PopButton";

interface SelectOption {
  title?: string;
  size?: string;
  label?: string;
}

interface SelectPopButtonProps {
  selected: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  label?: string;
  formatOption?: (option: SelectOption) => string;
  formatSelected?: (value: string) => string;
}

const SelectPopButton: React.FC<SelectPopButtonProps> = ({
  selected,
  options,
  onChange,
  label = "옵션 선택",
  formatOption = (option) => option.title || option.size || option.label || "",
  formatSelected = (value) => value,
}) => {
  const getOptionValue = (option: SelectOption) => {
    return option.title || option.size || option.label || "";
  };

  return (
    <PopButton
      value={label}
      className={styles.TriggerBtn}
      ButtonTrigger={<>{formatSelected(selected)}</>}
      ButtonIcons={
        <span>
          <IoIosArrowUp />
        </span>
      }
      ButtonContent={
        <ul className={styles.SizeTool} role="listbox" aria-label={label}>
          {options.map((option) => {
            const optionValue = getOptionValue(option);

            return (
              <li
                key={optionValue}
                className={styles.Item}
                role="option"
                aria-selected={selected === optionValue}
                tabIndex={0}
              >
                <button
                  className={styles.btn}
                  onClick={() => onChange(optionValue)}
                  aria-label={`${formatOption(option)} 선택`}
                >
                  {formatOption(option)}
                </button>
              </li>
            );
          })}
        </ul>
      }
      down={true}
    />
  );
};

export default SelectPopButton;
