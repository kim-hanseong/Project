import React from "react";
import styles from "./Improvements.module.css";
import FlexBox from "@/components/common/FlexBox";
import TitleTag from "@/components/common/TitleTag";

const Improvements: React.FC = () => {
  const improvements = [
    {
      title: "className 일관성 부족",
      description:
        "컴포넌트 스타일링 시 className의 네이밍 규칙이 일관되지 않아 유지보수와 협업 시 혼란이 있었습니다. BEM이나 CSS Modules 규칙 등을 명확히 정해 사용하는 것이 필요합니다.",
      impact: [
        "코드 가독성 향상",
        "유지보수 용이성 증가",
        "팀 내 스타일링 규칙 통일",
        "협업 생산성 향상",
      ],
    },
    {
      title: "전역 타입 정의 부족",
      description:
        "공통적으로 사용되는 타입들을 전역으로 분리하여 관리하지 않아, 중복 선언이 발생하고 타입 수정 시 여러 파일을 수정해야 하는 비효율이 있었습니다. `types` 폴더를 활용한 전역 타입 정의가 필요합니다.",
      impact: [
        "타입 재사용성 증가",
        "코드 중복 감소",
        "유지보수 편의성 향상",
        "타입 관리 일관성 확보",
      ],
    },
    {
      title: "책 자동 업데이트 기능 미구현",
      description:
        "외부 API 데이터를 기반으로 책 정보를 자동으로 업데이트하는 기능을 아직 구현하지 못했습니다. 스케줄러나 웹훅 등을 활용한 자동화 기능이 필요합니다.",
      impact: [
        "데이터 최신 상태 유지",
        "관리자의 수동 작업 감소",
        "사용자 경험 향상",
        "시스템 신뢰도 증가",
      ],
    },
    {
      title: "전역 모달 상태 관리 최적화 부족",
      description:
        "모달 상태를 전역으로 관리하는 과정에서 구조적이고 확장 가능한 설계를 미처 고민하지 못했습니다. 커스텀 훅과 context 기반 관리 방식의 도입이 필요합니다.",
      impact: [
        "상태 관리 일관성 확보",
        "모달 확장성 향상",
        "컴포넌트 간 의존도 감소",
        "유지보수 용이성 증가",
      ],
    },
    {
      title: "스타일링 세부 완성도 부족",
      description:
        "스타일 측면에서 사용자 경험을 충분히 고려하지 못한 부분이 있었고, 세부적인 반응형 대응이나 시각적 완성도가 아쉬운 부분이 존재했습니다.",
      impact: [
        "사용자 만족도 향상",
        "UI/UX 품질 개선",
        "브랜드 이미지 강화",
        "접근성과 일관성 확보",
      ],
    },
    {
      title: "폴더 구조 설계 미흡",
      description:
        "기능별로 구분된 폴더 구조가 다소 모호하여, 신규 기능 추가나 유지보수 시 불명확한 책임 분리가 있었습니다. 기능 기반 혹은 도메인 기반의 구조로 리팩토링이 필요합니다.",
      impact: [
        "코드 구조 명확화",
        "역할 분리 용이",
        "확장성 증가",
        "온보딩 시간 단축",
      ],
    },
  ];

  return (
    <section className={styles.container}>
      <FlexBox $align="start" $gap={22} $col={true}>
        <TitleTag level={3} classNames={styles.title}>
          개선이 필요한 부분
        </TitleTag>
        <div className={styles.improvementsList}>
          {improvements.map((improvement, index) => (
            <div key={index} className={styles.improvementCard}>
              <h3 className={styles.improvementTitle}>{improvement.title}</h3>
              <p className={styles.improvementDescription}>
                {improvement.description}
              </p>
              <div className={styles.impactSection}>
                <h4 className={styles.impactTitle}>개선 효과</h4>
                <ul className={styles.impactList}>
                  {improvement.impact.map((item, idx) => (
                    <li key={idx} className={styles.impactItem}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </FlexBox>
    </section>
  );
};

export default Improvements;
