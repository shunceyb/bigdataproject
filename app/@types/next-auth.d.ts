import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string; // 👈 Add role to session user
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    role: string; // 👈 Add role to user object
  }
}
