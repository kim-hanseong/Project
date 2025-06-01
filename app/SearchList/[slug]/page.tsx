"use client";
import Layout from "@/components/layout/LayOut";
import SearchListPage from "@/components/pages/searchList";

function Page(props: { params: { slug: string } }) {
  return (
    <Layout>
      <SearchListPage params={props.params} />
    </Layout>
  );
}

export default Page;
