import React from "react";
import styled from "styled-components";

/**
 * `FlexBox` 컴포넌트의 props 타입입니다.
 */
interface FlexBoxProps {
  children: React.ReactNode;
  className?: string;
  $col?: boolean; // `$col`로 변경 (Transient Prop)
  $gap?: number; // `$gap`으로 변경
  $justify?: string;
  $align?: string;
  $wrap?: "nowrap" | "wrap" | "wrap-reverse"; // `$wrap` 추가
  tooltipText?: string;
}

const FlexContainer = styled.div<FlexBoxProps>`
  display: flex;
  flex-direction: ${(props) => (props.$col ? "column" : "row")};
  gap: ${(props) => (props.$gap ? `${props.$gap}px` : "0px")};
  justify-content: ${(props) => props.$justify || "flex-start"};
  align-items: ${(props) => props.$align || "stretch"};
  flex-wrap: ${(props) => props.$wrap || "nowrap"}; // ✅ 추가된 부분
`;

const FlexBox: React.FC<FlexBoxProps> = ({
  children,
  className,
  $col = false,
  $gap = 0,
  $justify,
  $align,
  $wrap = "nowrap", // 기본값 설정
  tooltipText,
}) => {
  return (
    <FlexContainer
      className={className}
      $col={$col}
      $gap={$gap}
      $justify={$justify}
      $align={$align}
      $wrap={$wrap} // ✅ 추가된 부분
      title={tooltipText}
    >
      {children}
    </FlexContainer>
  );
};

export default FlexBox;
