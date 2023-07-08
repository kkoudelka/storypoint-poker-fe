import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";

const wsLink = new GraphQLWsLink(
  createClient({
    url: `${process.env.NEXT_PUBLIC_BE_WS_ROOT}/graphql`,
  }),
);

const getApolloClient = (token?: string) => {
  const httpLink = new HttpLink({
    uri: `${process.env.NEXT_PUBLIC_BE_ROOT}/graphql`,
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
      );
    },
    wsLink,
    httpLink,
  );

  const { getClient } = registerApolloClient(() => {
    return new ApolloClient({
      cache: new InMemoryCache(),
      link: splitLink,
    });
  });

  return getClient();
};

export default getApolloClient;
