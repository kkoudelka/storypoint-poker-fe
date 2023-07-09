import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";

const wsLink = new GraphQLWsLink(
  createClient({
    url: `${process.env.NEXT_PUBLIC_BE_WS_ROOT}/graphql`,
  }),
);

const httpLink = new HttpLink({
  uri: `${process.env.NEXT_PUBLIC_BE_ROOT}/graphql`,
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

const getClient = () => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: splitLink,
  });
};

export default getClient;
