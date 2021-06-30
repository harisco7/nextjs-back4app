import styles from './LoginForm.module.scss';
import { useUserLoginMutation } from 'graphql/mutations/logIn.generated';
import { useState } from 'react';
import { LogInInput } from 'types';
import { useRouter } from 'next/router';
import { setAuthCookie } from 'lib/auth';
import { initializeApollo } from 'lib/apollo-client';
import { useTranslation } from 'next-i18next';

const LoginForm = (): JSX.Element => {
  const apolloClient = initializeApollo();
  const router = useRouter();
  const { t } = useTranslation('common');

  const [username, setUsernameState] = useState('');
  const [password, setPasswordState] = useState('');
  const [error, setError] = useState('');

  const [userLoginMutation] = useUserLoginMutation();

  const loginFn = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, userData: LogInInput) => {
    e.preventDefault();
    try {
      const result = await userLoginMutation({
        variables: {
          userData,
        },
      });
      if (result.data?.logIn?.viewer.sessionToken) {
        apolloClient.resetStore();
        setAuthCookie(result.data.logIn.viewer.sessionToken);
        router.push('/profile');
      }
    } catch (error) {
      setError(t('signin-error'));
    }
  };

  return (
    <div className={styles.root}>
      <h4>{t('signInHeader')}</h4>
      <h5>{t('signInSubHeader')}</h5>
      <div>
        <label htmlFor="username">{t('yourUsername')}</label>
        <input type="text" id="username" name="username" value={username} onChange={(e) => setUsernameState(e.currentTarget.value)} />
      </div>
      <div>
        <label>{t('yourPassword')}</label>
        <input type="password" name="password" value={password} onChange={(e) => setPasswordState(e.currentTarget.value)} />
      </div>
      <div className={styles.error}>{error}</div>
      <div>
        <button type="button" onClick={(e) => loginFn(e, { username, password })}>
          {t('loginLabel')}
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
