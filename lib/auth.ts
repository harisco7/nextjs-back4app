import { GET_CURRENT_USER } from 'graphql/queries/getCurrentUser';
import Cookies from 'js-cookie';
import { User } from 'types';
import { COOKIES_TOKEN_NAME, getToken, initializeApollo } from 'lib/apollo-client';
import { GetServerSidePropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';

export interface AuthData {
  currentUser?: Partial<User>;
  isAuthenticated: boolean;
}

export async function getUserAuth(context?: GetServerSidePropsContext<ParsedUrlQuery>): Promise<AuthData> {
  const unauthenticatedResponse = { isAuthenticated: false };
  const apolloClient = initializeApollo(undefined, context);
  const token = getToken(context?.req);

  if (!token) {
    apolloClient.resetStore();
    return unauthenticatedResponse;
  }

  try {
    const res = await apolloClient.query({
      query: GET_CURRENT_USER,
    });
    return res.data?.viewer?.user ? { currentUser: res.data.viewer.user, isAuthenticated: true } : { isAuthenticated: false };
  } catch (error) {
    console.warn(error);
  }

  return unauthenticatedResponse;
}

export function setAuthCookie(sessionToken: string): void {
  const apolloClient = initializeApollo();
  apolloClient.resetStore();
  Cookies.set(COOKIES_TOKEN_NAME, sessionToken, {
    expires: 30,
    secure: process.env.NODE_ENV !== 'development',
  });
}

export function deleteAuthCookie(): void {
  const apolloClient = initializeApollo();
  apolloClient.resetStore();
  Cookies.remove(COOKIES_TOKEN_NAME);
}
