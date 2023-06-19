import '@/style/default.css';
import Head from 'next/head';



// Components
import Layout from '../../components/ui/Layout/Layout';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (

      <Layout>
        <Head>          
          <title>Site des Copropriétaire de la résidence GAMBETTA</title>            
        </Head>
        <Component {...pageProps} />
      </Layout>
   
  );
}
