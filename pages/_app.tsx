import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../lib/apollo-client';
import { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import Layout from 'components/Layout';
import { initializeParse } from '@parse/react-ssr';
import { DefaultSeo } from 'next-seo';
import SEO from '../next-seo.config';

import 'reseter.css';
import 'css/global.scss';

initializeParse(process.env.NEXT_PUBLIC_PARSE_URL || '', process.env.NEXT_PUBLIC_PARSE_APPLICATION_ID || '', process.env.NEXT_PUBLIC_PARSE_JAVASCRIPT_KEY || '');

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  const apolloClient = useApollo(pageProps);

  return (
    <ApolloProvider client={apolloClient}>
      <Layout>
        <DefaultSeo {...SEO} />
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
};

export default appWithTranslation(MyApp);
