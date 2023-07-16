/* eslint-disable @typescript-eslint/ban-ts-comment */
import axios from "axios";
import NextAuth, { type AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import signJwt from "jwt-encode";
import decodeJwt from "jwt-decode";

export const authOptions: AuthOptions = {
  secret: process.env.JWT_SECRET,
  session: {
    strategy: "jwt",
  },
  cookies: {
    sessionToken: {
      name: "session-token",
      options: {
        // TODO: This is not ideal, but I need to be able to read it for the Apollo Client
        httpOnly: false,
        sameSite: "lax",
        path: "/",
        secure: false,
      },
    },
  },
  jwt: {
    decode(params) {
      return decodeJwt(params.token ?? "");
    },
    encode(params) {
      return signJwt(params.token, process.env.JWT_SECRET ?? "");
    },
  },
  debug: false,
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        try {
          const result = await axios.post(
            `${process.env.BE_INTERNAL_ROOT}/auth/login`,
            {
              email: credentials?.email,
              password: credentials?.password,
            },
          );

          if (result.status !== 200) {
            return null;
          }

          const user = result.data;

          if (!user) {
            return null;
          }
          return user;
        } catch (error) {
          console.log("err", { error });
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user, trigger, session }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }

      if (user) {
        token.user = user;
      }

      if (trigger === "update" && session?.username) {
        // @ts-ignore
        token.user.username = session.username;
      }

      if (trigger === "update" && session?.profilePic) {
        // @ts-ignore
        token.user.profilePic = session.profilePic;
      }

      return token;
    },

    async session({ session, token }) {
      // @ts-ignore
      session.accessToken = token.accessToken;
      // @ts-ignore
      session.user = token.user;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
