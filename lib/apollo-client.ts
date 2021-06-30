import { useMemo } from 'react';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import merge from 'deepmerge';
import isEqual from 'lodash/isEqual';
import { setContext } from '@apollo/client/link/context';
import cookie from 'cookie';
import { GetServerSidePropsContext } from 'next';
import { IncomingMessage } from 'http';
import cache from './cache';
import { AuthData } from './auth';

export interface PageProps {
  props: NonNullable<any>;
  revalidate?: number;
}

export interface AuthPageProps extends PageProps {
  props: NonNullable<AuthData>;
}

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';
export const COOKIES_TOKEN_NAME = 'jwt';

let apolloClient: ApolloClient<InMemoryCache>;

export const getToken = (req?: IncomingMessage): string => {
  const parsedCookie = cookie.parse(req ? req.headers.cookie ?? '' : document.cookie);
  return parsedCookie[COOKIES_TOKEN_NAME];
};

const createApolloClient = (ctx?: GetServerSidePropsContext) => {
  const authLink = setContext((_, { headers }) => {
    // Get the authentication token from cookies
    const token = getToken(ctx?.req);

    return {
      headers: {
        ...headers,
        ...(token ? { 'X-Parse-Session-Token': token } : {}),
      },
    };
  });
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: authLink.concat(
      new HttpLink({
        uri: process.env.NEXT_PUBLIC_PARSE_GRAPHQL_URL,
        headers: {
          'X-Parse-Application-Id': process.env.NEXT_PUBLIC_PARSE_APPLICATION_ID,
          'X-Parse-Client-Key': process.env.NEXT_PUBLIC_PARSE_CLIENT_KEY,
        },
      })
    ),
    cache: cache,
  });
};

export function initializeApollo(initialState?: InMemoryCache, ctx?: GetServerSidePropsContext): ApolloClient<InMemoryCache> {
  const _apolloClient = apolloClient ?? createApolloClient(ctx);

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState != null) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge<InMemoryCache>(initialState, existingCache, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [...sourceArray, ...destinationArray.filter((d) => sourceArray.every((s) => !isEqual(d, s)))],
    });

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data);
  }

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function addApolloState(client: ApolloClient<InMemoryCache>, pageProps: PageProps): PageProps {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }
  return pageProps;
}

export function useApollo(pageProps: { [APOLLO_STATE_PROP_NAME]: any }): ApolloClient<InMemoryCache> {
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  const store = useMemo(() => initializeApollo(state), [state]);
  return store;
}
