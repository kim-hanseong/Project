import FlexBox from "@/components/common/FlexBox";
import styles from "@/components/layout/Footer/Footer-Customer/index.module.css";

const FooterCustom: React.FC = () => {
  return (
    <FlexBox className={styles.Tool} $col={true}>
      <strong role="complementary" className={styles.Title}>
        Custom Center
      </strong>
      <span className={styles.Number}>031-955-2555</span>
    </FlexBox>
  );
};

export default FooterCustom;
