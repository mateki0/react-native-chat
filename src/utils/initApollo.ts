import { createHttpLink, split, ApolloClient, InMemoryCache, ApolloLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { setContext } from '@apollo/client/link/context';
import * as AbsintheSocket from '@absinthe/socket';
import { createAbsintheSocketLink } from '@absinthe/socket-apollo-link';
import { Socket as PhoenixSocket } from 'phoenix';

import TOKEN from '@env';

const initApollo = () => {
  const httpLink = createHttpLink({
    uri: 'https://chat.thewidlarzgroup.com/api/graphql',
  });

  const wssUri = 'wss://chat.thewidlarzgroup.com/socket';

  const phoenixSocket = new PhoenixSocket(wssUri, {
    params: () => {
      return { token: `Bearer ${TOKEN}` };
    },
  });

  const absintheSocket = AbsintheSocket.create(phoenixSocket);

  const wsLink = createAbsintheSocketLink(absintheSocket);

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${TOKEN}`,
      },
    };
  });

  const concatedAuthLink = authLink.concat(httpLink);

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
    },
    wsLink,
    concatedAuthLink,
  );

  const cache = new InMemoryCache();

  return new ApolloClient({
    cache,
    link: splitLink,
  });
};

export default initApollo;
