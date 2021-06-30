import { AuthPageProps } from 'lib/apollo-client';
import withAuth from 'hoc/withAuth';
import { GetServerSidePropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import Card from 'components/Card';
import ProfileForm from 'components/ProfileForm';
import { AuthData, getUserAuth } from 'lib/auth';
import { getContextTranslations } from 'lib/i18n';

const Profile = ({ currentUser = {} }: Partial<AuthData>): JSX.Element => {
  return (
    <Card>
      <ProfileForm user={currentUser} />
    </Card>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext<ParsedUrlQuery>): Promise<AuthPageProps> {
  const translations = await getContextTranslations(context);
  const authData = await getUserAuth(context);

  return {
    props: {
      ...translations,
      ...authData, // it's mandatory to pass the auth data as props
    },
  };
}

export default withAuth(Profile);
