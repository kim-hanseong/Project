import classNames from "classnames";
import React, { forwardRef } from "react"; // React를 가져오기
import { useState } from "react";
import { IconType } from "react-icons";

import styles from "@/components/전역/PopButton/index.module.css";
import useOutsideClickHandler from "@/Hook/Ref/useOutSide";

interface UserMatchComponentProps {
  className?: string;
  value: string;
  ButtonTrigger: React.ReactNode;
  ButtonIcons?: React.ReactNode;
  ButtonContent: React.ReactNode;
  down?: boolean;
  icon?: boolean;
}

interface PopButtonType extends React.FC<UserMatchComponentProps> {
  Tool: React.ForwardRefExoticComponent<
    {
      children?: React.ReactNode;
    } & React.RefAttributes<HTMLDivElement>
  >;
  Trigger: React.FC<{
    className?: string;
    Open: boolean;

    CustomComponent: React.ReactNode; // JSX 표현을 받을 수 있게 수정
    ButtonIcons?: React.ReactNode; // JSX 표현을 받을 수 있게 수정
    onClick: () => void;
  }>;
  Contents: React.FC<{
    CustomComponent: React.ReactNode;
    Open: boolean;
    down?: boolean;
    toggleOpen: () => void; // toggleOpen을 전달받도록 수정
  }>;
}
/**
 * Pop Button 입니다 해당 trigger 와 contetns 를 보이고 숨기고 할 수 있습니다.
 *
 * @param {React.ReactNode;} ButtonTrigger - 버튼 트리거 입니다
 *
 * @param {React.ReactNode;} ButtonContent - trigger 에 클릭이 일어나면 보여지는 컨텐츠 입니다.
 * @param {boolean} down - 해당 컨텐츠가 트리거 기준 아래로 or 옆으로 나오게 합니다 (true 면 밑으로).
 * @param {string} value - 모달의 고유 이름으로, 모달 순서를 추적하는 데 사용됩니다.
 *
 */

const PopButton: PopButtonType = ({
  className,
  ButtonTrigger,
  ButtonIcons,
  ButtonContent,
  down,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useOutsideClickHandler(isOpen, setIsOpen);

  const toggleOpen = () => {
    setIsOpen((prev) => !prev); // 상태 토글
  };

  return (
    <PopButton.Tool ref={modalRef}>
      <PopButton.Trigger
        Open={isOpen}
        className={className}
        CustomComponent={ButtonTrigger}
        onClick={toggleOpen}
        ButtonIcons={ButtonIcons}
      />
      <PopButton.Contents
        CustomComponent={ButtonContent}
        Open={isOpen}
        down={down}
        toggleOpen={toggleOpen} // toggleOpen 전달
      />
    </PopButton.Tool>
  );
};

PopButton.Tool = forwardRef<HTMLDivElement, { children?: React.ReactNode }>(
  ({ children }, ref) => {
    return (
      <div ref={ref} className="relative">
        {children}
      </div>
    );
  }
);

PopButton.Trigger = ({
  CustomComponent,
  ButtonIcons,
  onClick,
  className,
  Open,
}: {
  CustomComponent: React.ReactNode;
  ButtonIcons?: React.ReactNode;
  onClick: () => void;
  className?: string;
  Open?: boolean;
}): JSX.Element => {
  return (
    <div
      role="button"
      onClick={onClick}
      className={classNames(
        "relative flex items-center justify-between",
        className
      )}
    >
      {CustomComponent}
      {ButtonIcons &&
        React.isValidElement(ButtonIcons) &&
        React.cloneElement(ButtonIcons as React.ReactElement, {
          className: classNames(styles.Icons, {
            [styles.OpenIcons]: Open,
          }),
        })}
    </div>
  );
};

PopButton.Contents = ({
  Open,
  CustomComponent,
  down,
  toggleOpen,
}: {
  Open: boolean;
  CustomComponent: React.ReactNode;
  down?: boolean;
  toggleOpen: () => void;
}): JSX.Element => {
  return (
    <div
      role="button"
      className={`${styles.modalContainer} ${Open ? styles.modalVisible : ""} ${
        down ? styles.modalDown : ""
      }`}
      onClick={toggleOpen}
    >
      {CustomComponent}
    </div>
  );
};

PopButton.Tool.displayName = "PopButton.Tool";
PopButton.Trigger.displayName = "PopButton.Trigger";
PopButton.Contents.displayName = "PopButton.Contents";

export default PopButton;
