"use client";

import PortfolioLayout from "@/components/pages/portfolio/PortfolioLayout";
import TechStack from "@/components/pages/portfolio/TechStack";
import Features from "@/components/pages/portfolio/Features";
import TechnicalDetails from "@/components/pages/portfolio/TechnicalDetails";
import ProblemSolving from "@/components/pages/portfolio/ProblemSolving";
import Improvements from "@/components/pages/portfolio/Improvements";

/**
 * 도서 추천 서비스 포트폴리오 페이지
 * 기여도: 100%
 * - 전체 디자인 설계 및 구현
 * - 컴포넌트 구조 설계
 * - 반응형 레이아웃 구현
 * - 기술 스택 및 기능 설명 작성
 */
export default function PortfolioPage() {
  return (
    <PortfolioLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          도서 추천 서비스 포트폴리오
        </h1>

        <TechStack />
        <Features />
        <TechnicalDetails />
        <ProblemSolving />
        <Improvements />
      </div>
    </PortfolioLayout>
  );
}
