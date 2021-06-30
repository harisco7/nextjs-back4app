import Card from 'components/Card';
import LoginForm from 'components/LoginForm';
import { PageProps } from 'lib/apollo-client';
import { getContextTranslations } from 'lib/i18n';
import { GetServerSidePropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';

export const Login = (): JSX.Element => {
  return (
    <Card>
      <LoginForm />
    </Card>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext<ParsedUrlQuery>): Promise<PageProps> {
  const translations = await getContextTranslations(context);

  return {
    props: {
      ...translations,
    },
  };
}

export default Login;
