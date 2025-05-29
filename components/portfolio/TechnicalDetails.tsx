import React from "react";
import { FaDatabase, FaMobile, FaShieldAlt, FaCode } from "react-icons/fa";
import styles from "./TechnicalDetails.module.css";

const TechnicalDetails: React.FC = () => {
  const details = [
    {
      title: "React 컴포넌트 최적화",
      icon: <FaCode className="w-6 h-6 text-blue-500" />,
      description: "재사용 가능한 컴포넌트 설계로 개발 효율성 향상",
      points: [
        "컴포넌트 분리 및 모듈화",
        "Props를 통한 데이터 전달",
        "컴포넌트 재사용성 극대화",
      ],
    },
    {
      title: "React Hook 활용",
      icon: <FaDatabase className="w-6 h-6 text-green-500" />,
      description: "React Hook을 활용한 효율적인 상태 관리",
      points: [
        "useState로 로컬 상태 관리",
        "useEffect로 사이드 이펙트 처리",
        "useContext로 전역 상태 관리",
        "커스텀 Hook 개발 및 활용",
      ],
    },
    {
      title: "상태 관리 최적화",
      icon: <FaMobile className="w-6 h-6 text-purple-500" />,
      description: "React state를 활용한 데이터 관리 최적화",
      points: [
        "상태 중앙화로 데이터 일관성 유지",
        "불필요한 API 호출 최소화",
        "메모이제이션을 통한 성능 개선",
      ],
    },
    {
      title: "보안 및 성능",
      icon: <FaShieldAlt className="w-6 h-6 text-orange-500" />,
      description: "보안과 성능을 고려한 최적화",
      points: [
        "TypeScript로 타입 안정성 확보",
        "이미지 최적화 및 지연 로딩",
        "API 요청 제한 및 캐싱",
      ],
    },
  ];

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>기술적 특징</h2>
      <div className={styles.grid}>
        {details.map((detail) => (
          <div key={detail.title} className={styles.card}>
            <div className={styles.header}>
              {detail.icon}
              <h3 className={styles.cardTitle}>{detail.title}</h3>
            </div>
            <p className={styles.description}>{detail.description}</p>
            <ul className={styles.list}>
              {detail.points.map((point, index) => (
                <li key={index} className={styles.listItem}>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TechnicalDetails;
