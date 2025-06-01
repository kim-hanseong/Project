/**
 * Info 컴포넌트
 * 제목과 내용을 렌더링하는 컴포넌트로, 외부에서 CSS 클래스와 이름을 전달받아 사용 가능합니다.
 *
 * @param {React.ReactNode} InfoTitle - 제목으로 표시될 React 노드입니다. (예: 텍스트, 아이콘 등)
 * @param {React.ReactNode} InfoContents - 내용으로 표시될 React 노드입니다. (예: 텍스트, 리스트 등)
 * @param {string} className - 컴포넌트의 스타일을 정의할 CSS 클래스 이름입니다.
 * @param {string} name - 특정 Info 컴포넌트를 식별하기 위한 모달 이름입니다.
 */

interface InfoProps {
  InfoTitle?: React.ReactNode;
  InfoContents: React.ReactNode;
  className?: string;
  name: string;
  role?: string;
  ariaLabel?: string;
  ariaLabelledby?: string;
  ariaDescribedby?: string;
}

const Info = ({
  InfoTitle,
  InfoContents,
  className,
  role,
  ariaLabel,
  ariaLabelledby,
  ariaDescribedby,
}: InfoProps) => {
  return (
    <dl
      className={className}
      role={role}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      aria-describedby={ariaDescribedby}
    >
      <dt>{InfoTitle}</dt>
      <dd>{InfoContents}</dd>
    </dl>
  );
};

export default Info;
