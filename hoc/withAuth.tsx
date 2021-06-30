import { AuthData, getUserAuth } from 'lib/auth';
import { NextComponentType, NextPageContext } from 'next';
import { useRouter } from 'next/dist/client/router';
import { useEffect, useState } from 'react';

type WithAuthComponent = {
  (props: AuthData): JSX.Element | null;
};

export default function withAuth(Component: NextComponentType<NextPageContext, any, any>, redirectRoute = '/login'): WithAuthComponent {
  return (props: Partial<AuthData>) => {
    // check whether we are on client/browser or server
    // if the page is server-side loaded, check the isAuthenticated prop

    const emptyComponent = <div></div>;

    if (typeof window === 'undefined') {
      return props.isAuthenticated ? <Component {...props} /> : emptyComponent;
    } else {
      const Router = useRouter();
      const [authenticated, setAuthenticated] = useState(Boolean(props.isAuthenticated));

      useEffect(() => {
        async function checkAuthState(currentAuthState: boolean | null) {
          // if props.isAuthenticated is null - no check has been made on the server side
          // check the authentication state now on the client side
          if (currentAuthState == null) {
            try {
              const authData = await getUserAuth();
              currentAuthState = authData.isAuthenticated;
            } catch (error) {
              currentAuthState = false;
            }
          }

          setAuthenticated(currentAuthState);
          if (!currentAuthState) {
            Router.replace(redirectRoute);
          }
        }

        checkAuthState(props.isAuthenticated != null ? authenticated : null);
      }, [Router, authenticated, props.isAuthenticated]);

      return authenticated ? <Component {...props} /> : emptyComponent;
    }
  };
}
