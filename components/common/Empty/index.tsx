// EmptyProduct.tsx

import { BsFillExclamationTriangleFill } from "react-icons/bs";

import styles from "./index.module.css";

import FlexBox from "@/components/common/FlexBox";
import RePlaceTag from "@/components/common/RePlaceTag";
import Info from "@/components/common/Info";

interface EmptyProductProps {
  message: string; // 공용 메시지
  submessage?: string; // 공용 메시지
  className?: string; // 선택적으로 스타일 확장 가능
}

const EmptyProduct: React.FC<EmptyProductProps> = ({
  message,
  submessage,
  className,
}) => {
  return (
    <RePlaceTag className={`${styles.replaceTool} ${className ?? ""}`}>
      <FlexBox $align="center" $justify="center" $col={true} $gap={22}>
        <BsFillExclamationTriangleFill />
        <Info
          className={styles.InfoTool}
          name="안내"
          InfoTitle={<span>{message}</span>}
          InfoContents={submessage}
        />
      </FlexBox>
    </RePlaceTag>
  );
};

export default EmptyProduct;
