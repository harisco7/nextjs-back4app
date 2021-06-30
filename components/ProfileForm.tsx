import styles from './LogoutForm.module.scss';
import { User } from 'types';
import { useRouter } from 'next/router';
import { deleteAuthCookie } from 'lib/auth';
import { useUserLogoutMutation } from 'graphql/mutations/logOut.generated';
import { initializeApollo } from 'lib/apollo-client';
import { generateClientMutationId } from 'lib/utils';

const ProfileForm = ({ user }: { user: Partial<User> }): JSX.Element => {
  const apolloClient = initializeApollo();
  const router = useRouter();

  const [userLogoutMutation] = useUserLogoutMutation();

  const logoutFn = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    try {
      const clientMutationId = generateClientMutationId();
      const result = await userLogoutMutation({
        variables: {
          userData: {
            clientMutationId,
          },
        },
      });

      if (result.data?.logOut?.clientMutationId) {
        apolloClient.resetStore();
        deleteAuthCookie();
        router.push('/');
      }
    } catch (error) {
      router.push('/profile');
    }
  };

  return (
    <div className={styles.root}>
      <div>
        Username: <strong>{user.username}</strong>
      </div>
      <div>
        Email: <strong>{user.email}</strong>
      </div>
      <div>
        Registered at: <strong>{new Date(user.createdAt).toDateString()}</strong>
      </div>
      <div>
        Name: <strong>{user.displayName}</strong>
      </div>
      <div>
        <button type="button" onClick={(e) => logoutFn(e)}>
          Log out
        </button>
      </div>
    </div>
  );
};

export default ProfileForm;
