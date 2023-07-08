// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth, { Session } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      username: string;
      email: string;
      [key: string]: string;
    };
  }

  interface JWT {
    user: {
      id: number;
      username: string;
      email: string;
      [key: string]: string;
    };
  }
}

interface CustomWindow {
  toggleDebug: () => void;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Window extends CustomWindow {}
}
