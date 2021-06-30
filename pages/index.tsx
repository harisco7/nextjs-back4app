import { addApolloState, initializeApollo, PageProps } from 'lib/apollo-client';
import Card from 'components/Card';
import { GetServerSidePropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import Intro from 'components/Intro';
import { getContextTranslations } from 'lib/i18n';

export const Home = (): JSX.Element => {
  return (
    <>
      <Card>
        <Intro />
      </Card>
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext<ParsedUrlQuery>): Promise<PageProps> {
  const apolloClient = initializeApollo(undefined, context);
  const translations = await getContextTranslations(context);

  return addApolloState(apolloClient, {
    props: {
      ...translations,
    },
  });
}

export default Home;
