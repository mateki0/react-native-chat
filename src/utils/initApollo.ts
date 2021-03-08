import { createHttpLink, split, ApolloClient, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { TOKEN } from '@env';
import * as AbsintheSocket from '@absinthe/socket';
import { createAbsintheSocketLink } from '@absinthe/socket-apollo-link';
import { hasSubscription } from '@jumpn/utils-graphql';
import PhoenixSocket from './socket';

const initApollo = () => {
  const httpLink = createHttpLink({
    uri: 'https://chat.thewidlarzgroup.com/api/graphql',
  });

  const wssUri = 'wss://chat.thewidlarzgroup.com/socket';

  const phoenixSocket = new PhoenixSocket(wssUri, {
    params: () => {
      return { token: TOKEN };
    },
  });

  const absintheSocket = AbsintheSocket.create(phoenixSocket);

  const wsLink = createAbsintheSocketLink(absintheSocket);

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        Authorization: `Bearer ${TOKEN}`,
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
