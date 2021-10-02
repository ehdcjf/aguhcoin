import BlogLayout from "../components/BlogLayout";
import Head from "next/head";
import Image from "next/image";
import WebSocket from "../components/WebSocket";

const Index = () => {
  return (
    <>
      <Head>
        <title>악어코인</title>
      </Head>
      <WebSocket>
        <BlogLayout>
          메인화면
          <Image src="/croco1.png" width="500%" height="500%" />
        </BlogLayout>
      </WebSocket>
    </>
  );
};

export default Index;
