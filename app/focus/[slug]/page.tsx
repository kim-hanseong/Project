"use client";
//* child components *
import FocusPage from "@/components/pages/focus";
import Layout from "@/components/layout/LayOut";

function Page(props: { params: { slug: string } }) {
  return (
    <Layout>
      <FocusPage params={props.params} />
    </Layout>
  );
}

export default Page;
