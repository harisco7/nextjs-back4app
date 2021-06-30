import styles from './LoginForm.module.scss';
import { useState } from 'react';
import { SignUpInput } from 'types';
import { useRouter } from 'next/router';
import { useUserSignupMutation } from 'graphql/mutations/signUp.generated';
import { setAuthCookie } from 'lib/auth';

const SignupForm = (): JSX.Element => {
  const router = useRouter();

  const [username, setUsernameState] = useState('');
  const [email, setEmailState] = useState('');
  const [password, setPasswordState] = useState('');
  const [error, setError] = useState('');

  const [userSignupMutation] = useUserSignupMutation();

  const signupFn = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, userData: SignUpInput) => {
    e.preventDefault();
    try {
      const result = await userSignupMutation({
        variables: {
          userData,
        },
      });
      if (result.data?.signUp?.viewer?.sessionToken) {
        setAuthCookie(result.data.signUp?.viewer.sessionToken);
        router.push('/profile');
      } else if (result.errors) {
        setError(result.errors[0].message);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className={styles.root}>
      <h4>Sign up</h4>
      <h5>Enter your user information</h5>
      <div>
        <label htmlFor="email">Your email</label>
        <input type="text" id="email" name="email" value={email} onChange={(e) => setEmailState(e.currentTarget.value)} />
      </div>
      <div>
        <label htmlFor="username">Your username</label>
        <input type="text" id="username" name="username" value={username} onChange={(e) => setUsernameState(e.currentTarget.value)} />
      </div>
      <div>
        <label>Your password</label>
        <input type="password" name="password" value={password} onChange={(e) => setPasswordState(e.currentTarget.value)} />
      </div>
      <div className={styles.error}>{error}</div>
      <div>
        <button
          type="button"
          onClick={(e) =>
            signupFn(e, {
              fields: {
                username,
                password,
                email,
              },
            })
          }
        >
          Sign up
        </button>
      </div>
    </div>
  );
};

export default SignupForm;
