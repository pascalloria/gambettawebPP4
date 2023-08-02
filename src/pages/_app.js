import '@/style/default.css';
import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';


// Components
import Layout from '../../components/ui/layout/Layout';

import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

export default function App({ Component, pageProps }) {
  const { session, ...restPageProps } = pageProps;
  return (
    <SessionProvider session={session}>
      <Layout>
        <Head>
          <title>Site des Copropriétaire de la résidence GAMBETTA</title>
        </Head>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
