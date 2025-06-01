import React from "react";
import styles from "./Improvements.module.css";
import FlexBox from "@/components/common/FlexBox";
import TitleTag from "@/components/common/TitleTag";

const Improvements: React.FC = () => {
  const improvements = [
    {
      title: "테스트 코드 부재",
      description:
        "프로젝트 초기부터 테스트 코드를 작성하지 않아 코드의 안정성을 보장하기 어려웠습니다. Jest와 React Testing Library를 활용한 단위 테스트와 통합 테스트를 추가하여 코드의 신뢰성을 높일 필요가 있습니다.",
      impact: [
        "코드의 안정성 보장",
        "리팩토링 시 기존 기능 보존",
        "버그 조기 발견",
        "코드 품질 향상",
      ],
    },
    {
      title: "성능 최적화 미흡",
      description:
        "대규모 데이터 처리나 이미지 최적화에 대한 고려가 부족했습니다. React.memo, useMemo, useCallback 등을 활용한 성능 최적화와 이미지 lazy loading, 코드 스플리팅 등을 적용할 필요가 있습니다.",
      impact: [
        "페이지 로딩 속도 개선",
        "메모리 사용량 최적화",
        "사용자 경험 향상",
        "서버 부하 감소",
      ],
    },
    {
      title: "에러 처리 미흡",
      description:
        "에러 바운더리나 전역 에러 핸들링이 부족했습니다. 사용자 친화적인 에러 메시지와 복구 메커니즘을 구현하여 안정적인 서비스를 제공할 필요가 있습니다.",
      impact: [
        "사용자 친화적인 에러 처리",
        "서비스 안정성 향상",
        "디버깅 용이성 증가",
        "사용자 경험 개선",
      ],
    },
    {
      title: "접근성 고려 부족",
      description:
        "웹 접근성 표준을 충분히 고려하지 않았습니다. ARIA 레이블, 키보드 네비게이션, 색상 대비 등을 개선하여 모든 사용자가 이용할 수 있는 서비스를 만들 필요가 있습니다.",
      impact: [
        "웹 접근성 표준 준수",
        "다양한 사용자 지원",
        "사용성 향상",
        "법적 요구사항 충족",
      ],
    },
    {
      title: "문서화 부족",
      description:
        "코드 문서화와 API 문서화가 부족했습니다. JSDoc을 활용한 코드 문서화와 API 문서를 작성하여 유지보수성을 높일 필요가 있습니다.",
      impact: [
        "코드 가독성 향상",
        "유지보수 용이성 증가",
        "팀 협업 효율성 향상",
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
