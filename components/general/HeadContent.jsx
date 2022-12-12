import Head from 'next/head';

export default function HeadContent({ children }) {
  return (
    <Head>
      <link rel="icon" href="/favicon.svg" />
      {children}
    </Head>
  );
}
