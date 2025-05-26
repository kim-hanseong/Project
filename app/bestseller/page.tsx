"use client";

//* child components *
import BestSellerPage from "@/components/bestseller";
import Layout from "@/components/layout/LayOut";

const Index: React.FC = () => {
  return (
    <Layout>
      <BestSellerPage />
    </Layout>
  );
};

export default Index;
