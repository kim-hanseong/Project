"use client";

import { useState } from "react";
import MainPage from "@/components/main";
import Layout from "@/components/layout/LayOut";

export default function Index() {
  const [isColumn, setIsColumn] = useState(false);

  return (
    <Layout>
      <MainPage />
    </Layout>
  );
}
