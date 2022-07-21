import { useMemo } from 'react';
import { ApolloClient, HttpLink, InMemoryCache, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { concatPagination, offsetLimitPagination } from '@apollo/client/utilities';
import merge from 'deepmerge';
import isEqual from 'lodash/isEqual';
import { setContext } from '@apollo/client/link/context';
import { getUserToken } from '../components/auth/localStorage';

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

let apolloClient;

export const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const authLink = setContext((_, { headers }) => {
  if (typeof window === 'undefined') {
    return;
  }
  const token = getUserToken();
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const httpLink = new HttpLink({
  uri: 'https://api.vrmarketing.guru/',
});

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: authLink.concat(from([errorLink, httpLink])),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          links: offsetLimitPagination(),
        },
      },
    }),
  });
}

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  if (initialState) {
    const existingCache = _apolloClient.extract();

    const data = merge(existingCache, initialState, {
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) => sourceArray.every((s) => !isEqual(d, s))),
      ],
    });

    _apolloClient.cache.restore(data);
  }

  if (typeof window === 'undefined') return _apolloClient;

  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function addApolloState(client, pageProps) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }

  return pageProps;
}

export function useApollo(pageProps) {
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  const store = useMemo(() => initializeApollo(state), [state]);
  return store;
}