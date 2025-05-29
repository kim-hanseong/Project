import React from "react";
import { SiNextdotjs } from "react-icons/si";
import styles from "../index.module.css";
import FlexBox from "@/components/전역/FlexBox";

interface FeaturesProps {
  features: string[];
}

interface ExamplesProps {
  examples: {
    title: string;
    description: string;
    code: string;
  }[];
}

interface NextJSProps {
  onBackClick: () => void;
  showDetails: boolean;
}

const NextJS: React.FC<NextJSProps> & {
  Title: React.FC;
  Description: React.FC;
  Features: React.FC<FeaturesProps>;
  Examples: React.FC<ExamplesProps>;
} = ({ onBackClick, showDetails }) => {
  const features = [
    "App Router를 통한 서버 사이드 렌더링",
    "자동 코드 분할 및 최적화",
    "API 라우트를 통한 백엔드 기능 구현",
    "메타데이터 API를 활용한 SEO 최적화",
    "이미지 최적화 및 자동 리사이징",
    "서버 컴포넌트를 통한 성능 최적화",
  ];

  const examples = [
    {
      title: "동적 라우팅 구현",
      description:
        "focus/[slug] 페이지를 통한 동적 라우팅 구현으로 SEO 최적화 및 사용자 경험 향상",
      code: `// app/focus/[slug]/page.tsx
export default async function FocusPage({ params }: { params: { slug: string } }) {
  const focusData = await getFocusData(params.slug);
  
  return (
    <FocusLayout>
      <FocusHeader data={focusData} />
      <FocusContent data={focusData} />
      <FocusFooter data={focusData} />
    </FocusLayout>
  );
}`,
    },
    {
      title: "로딩 UI 구현",
      description: "Next.js의 loading.tsx를 활용한 로딩 상태 처리",
      code: `// app/focus/[slug]/loading.tsx
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-4">
      {/* 헤더 스켈레톤 */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
      
      {/* 썸네일 스켈레톤 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="aspect-video w-full rounded-lg" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
}`,
    },
  ];

  return (
    <div
      className={`${styles.techDetail} ${showDetails ? styles.slideIn : ""}`}
    >
      <button onClick={onBackClick} className={styles.backButton}>
        <span className={styles.backArrow}>←</span> 돌아가기
      </button>
      <FlexBox $align="start" $gap={16} $col={true}>
        <NextJS.Title />
        <NextJS.Description />
        <NextJS.Features features={features} />
        <NextJS.Examples examples={examples} />
      </FlexBox>
    </div>
  );
};

NextJS.Title = () => (
  <FlexBox $align="center" $gap={16}>
    <div className={styles.detailIcon}>
      <SiNextdotjs className={styles.icon} />
    </div>
    <h3 className={styles.detailTitle}>Next.js</h3>
  </FlexBox>
);

NextJS.Description = () => (
  <p className={styles.detailDescription}>
    App Router를 활용한 서버 사이드 렌더링 구현
  </p>
);

NextJS.Features = ({ features }: FeaturesProps) => (
  <div className={styles.detailFeatures}>
    <h4 className={styles.featuresTitle}>주요 특징</h4>
    <ul className={styles.featuresList}>
      {features.map((feature, index) => (
        <li key={index} className={styles.featureItem}>
          {feature}
        </li>
      ))}
    </ul>
  </div>
);

NextJS.Examples = ({ examples }: ExamplesProps) => (
  <div className={styles.examples}>
    <h4 className={styles.examplesTitle}>구현 예시</h4>
    {examples.map((example, index) => (
      <div key={index} className={styles.example}>
        <h5 className={styles.exampleTitle}>{example.title}</h5>
        <p className={styles.exampleDescription}>{example.description}</p>
        {example.code && (
          <pre className={styles.codeBlock}>
            <code>{example.code}</code>
          </pre>
        )}
      </div>
    ))}
  </div>
);

// displayName 설정
NextJS.Title.displayName = "NextJS.Title";
NextJS.Description.displayName = "NextJS.Description";
NextJS.Features.displayName = "NextJS.Features";
NextJS.Examples.displayName = "NextJS.Examples";

export default NextJS;
