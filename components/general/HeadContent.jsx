import HeadContent from '@/HeadContent';;

export default function HeadContent({ children }) {
  return (
    <Head>
      <link rel="icon" href="/favicon.svg" />
      {children}
    </Head>
  );
}
