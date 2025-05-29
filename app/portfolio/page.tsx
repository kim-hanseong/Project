"use client";

import PortfolioLayout from "@/components/portfolio/PortfolioLayout";
import Achievements from "@/components/portfolio/Achievements";
import TechStack from "@/components/portfolio/TechStack";
import Features from "@/components/portfolio/Features";
import TechnicalDetails from "@/components/portfolio/TechnicalDetails";

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
        <Achievements />
      </div>
    </PortfolioLayout>
  );
}
