import React from "react";
import styled from "styled-components";

/**
 * `FlexBox` 컴포넌트의 props 타입입니다.
 */
interface FlexBoxProps {
  children: React.ReactNode;
  className?: string;
  $col?: boolean;
  $gap?: number;
  $justify?: string;
  $align?: string;
  $wrap?: "nowrap" | "wrap" | "wrap-reverse";
  tooltipText?: string;
  // 접근성 관련 props 추가
  role?: string;
  ariaLabel?: string;
  ariaLabelledby?: string;
  ariaDescribedby?: string;
  ariaHidden?: boolean;
}

const FlexContainer = styled.div<FlexBoxProps>`
  display: flex;
  flex-direction: ${(props) => (props.$col ? "column" : "row")};
  gap: ${(props) => (props.$gap ? `${props.$gap}px` : "0px")};
  justify-content: ${(props) => props.$justify || "flex-start"};
  align-items: ${(props) => props.$align || "stretch"};
  flex-wrap: ${(props) => props.$wrap || "nowrap"};
`;

const FlexBox: React.FC<FlexBoxProps> = ({
  children,
  className,
  $col = false,
  $gap = 0,
  $justify,
  $align,
  $wrap = "nowrap",
  tooltipText,
  // 접근성 props 추가
  role,
  ariaLabel,
  ariaLabelledby,
  ariaDescribedby,
  ariaHidden,
}) => {
  return (
    <FlexContainer
      className={className}
      $col={$col}
      $gap={$gap}
      $justify={$justify}
      $align={$align}
      $wrap={$wrap}
      title={tooltipText}
      // 접근성 속성 추가
      role={role}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      aria-describedby={ariaDescribedby}
      aria-hidden={ariaHidden}
    >
      {children}
    </FlexContainer>
  );
};

export default FlexBox;
