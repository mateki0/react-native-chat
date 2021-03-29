import { createHttpLink, split, ApolloClient, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as AbsintheSocket from '@absinthe/socket';
import { createAbsintheSocketLink } from '@absinthe/socket-apollo-link';
import { hasSubscription } from '@jumpn/utils-graphql';
import PhoenixSocket from './socket';

const initApollo = () => {
  const httpLink = createHttpLink({
    uri: '',
  });

  const wssUri = '';

  const phoenixSocket = new PhoenixSocket(wssUri, {
    params: async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        return { token };
      }
      return {};
    },
  });

  const absintheSocket = AbsintheSocket.create(phoenixSocket);

  const wsLink = createAbsintheSocketLink(absintheSocket);

  const authLink = setContext(async (_, { headers }) => {
    const token = await AsyncStorage.getItem('token');

    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : ``,
      },
    };
  });

  const authedHttpLink = authLink.concat(httpLink);

  const link = split((operation) => hasSubscription(operation.query), wsLink, authedHttpLink);

  const cache = new InMemoryCache();

  return new ApolloClient({
    link,
    cache,
  });
};

export default initApollo;
