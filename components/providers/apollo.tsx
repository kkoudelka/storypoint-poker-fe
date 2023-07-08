"use client";

import { ApolloLink, HttpLink, SuspenseCache, split } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import {
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  NextSSRApolloClient,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";
import Cookies from "js-cookie";
import React from "react";

// have a function to create a client for you
const makeClient = () => {
  const getToken = () => {
    return Cookies.get("session-token");
  };

  const token = typeof window !== "undefined" ? getToken() : null;

  const httpLink = new HttpLink({
    // this needs to be an absolute url, as relative urls cannot be used in SSR
    uri: `${process.env.NEXT_PUBLIC_BE_ROOT}/graphql`,
    // you can disable result caching here if you want to
    // (this does not work if you are rendering your page with `export const dynamic = "force-static"`)
    fetchOptions: { cache: "no-store" },

    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  const wsLink = new GraphQLWsLink(
    createClient({
      url: `${process.env.NEXT_PUBLIC_BE_WS_ROOT}/graphql`,
    }),
  );

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

  return new NextSSRApolloClient({
    // use the `NextSSRInMemoryCache`, not the normal `InMemoryCache`
    cache: new NextSSRInMemoryCache(),
    link:
      typeof window === "undefined"
        ? ApolloLink.from([
            // in a SSR environment, if you use multipart features like
            // @defer, you need to decide how to handle these.
            // This strips all interfaces with a `@defer` directive from your queries.
            new SSRMultipartLink({
              stripDefer: true,
            }),
            httpLink,
          ])
        : splitLink,
  });
};

// also have a function to create a suspense cache
function makeSuspenseCache() {
  return new SuspenseCache();
}

// you need to create a component to wrap your app in
export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider
      makeClient={makeClient}
      makeSuspenseCache={makeSuspenseCache}
    >
      {children}
    </ApolloNextAppProvider>
  );
}
