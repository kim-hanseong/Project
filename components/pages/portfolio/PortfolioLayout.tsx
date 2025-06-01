import React from "react";
import Layout from "../../layout/LayOut";

interface PortfolioLayoutProps {
  children: React.ReactNode;
}

const PortfolioLayout: React.FC<PortfolioLayoutProps> = ({ children }) => {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">{children}</div>
    </Layout>
  );
};

export default PortfolioLayout;
