import Link from "next/link";

interface UserMatchComponentProps {
  /** 아이콘 컴포넌트 (예: <EditIcon />, <DeleteIcon /> 등) */
  ButtonIcons: React.ReactNode;

  /** 이동할 URL (있을 경우 <Link> 사용) */
  Href?: string;

  /** 클릭 시 실행할 함수 (Href가 없고 onClick이 있을 경우 <button> 사용) */
  onClick?: () => void;

  /** 아이콘을 감싸는 span의 클래스명 */
  className?: string;

  /** 현재 사용되지 않지만 확장성을 고려한 prop (예: tooltip 내용 등) */
  value: string;
}

interface PopButtonType extends React.FC<UserMatchComponentProps> {
  /** 링크 또는 버튼 wrapper 역할을 하는 컴포넌트 */
  Tool: React.FC<{
    children?: React.ReactNode;
    Href?: string;
    onClick?: () => void;
  }>;

  /** 아이콘 자체를 감싸는 컴포넌트 (className 적용 가능) */
  ICons: React.FC<{
    CustomComponent: React.ReactNode;
    className?: string;
  }>;
}

/**
 * LinkIcon 컴포넌트
 * - Href가 있으면 <Link>로 감싸고, 없고 onClick이 있으면 <button>으로 감쌈
 * - 내부에 아이콘만 있는 버튼/링크 형태의 UI 컴포넌트를 구성할 때 사용
 */
const LinkIcon: PopButtonType = ({ className, Href, onClick, ButtonIcons }) => {
  return (
    <LinkIcon.Tool Href={Href} onClick={onClick}>
      <LinkIcon.ICons CustomComponent={ButtonIcons} className={className} />
    </LinkIcon.Tool>
  );
};

/**
 * Href가 있을 경우 <Link>, onClick이 있을 경우 <button>을 반환
 * 그렇지 않으면 children만 그대로 출력
 */
LinkIcon.Tool = ({
  children,
  Href,
  onClick,
}: {
  children?: React.ReactNode;
  Href?: string;
  onClick?: () => void;
}) => {
  if (Href) {
    return <Link href={Href}>{children}</Link>;
  }
  if (onClick) {
    return (
      <button
        onClick={onClick}
        style={{ background: "none", border: "none", cursor: "pointer" }}
      >
        {children}
      </button>
    );
  }

  return <>{children}</>;
};

/**
 * 아이콘 컴포넌트 출력부
 * className을 이용해 스타일링 가능
 */
LinkIcon.ICons = ({
  CustomComponent,
  className,
}: {
  CustomComponent: React.ReactNode;
  className?: string;
}) => {
  return <span className={className}>{CustomComponent}</span>;
};

LinkIcon.Tool.displayName = "IconBtn.Tool";
LinkIcon.ICons.displayName = "IconBtn.ICons";

export default LinkIcon;
