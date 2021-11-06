import { ApolloClient, InMemoryCache, ApolloLink } from '@apollo/client';

const httpLink = 'https://s6hca5j1.api.sanity.io/v1/graphql/production/default';

const client = new ApolloClient({
  uri: httpLink,
  cache: new InMemoryCache(),
});

export default client;
