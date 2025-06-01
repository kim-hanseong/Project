/**
 * Modal 컴포넌트를 분리시켜놓는 컴포넌트 입니다.
 *
 * @param {React.ReactNode;} Children -- 여러 Modal들을 자식요소를 틀로 받아드립니다.
 *
 */

const ModalComponenet: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <>{children}</>;
};

export default ModalComponenet;
