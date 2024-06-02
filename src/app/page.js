import ChatWorkflow from '@/components/ChatWorkflow';
import Head from 'next/head';

export default function Home() {
  return (
    <main>
      <Head>
        <title>Chatbot flow builder</title>
      </Head>

      <ChatWorkflow />
    </main>
  );
}
