// types/next-auth.d.ts
import NextAuth from "next-auth";

// Extend the User type to include 'category'
declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    username: string | null | undefined;
    name: string;
    role: string;
  }

  // Extend the Session type if you want to include it in the session
  interface Session {
    user: {
      id: string;
      email: string;
      username: string | null | undefined;
      name: string;
      role: string;
    };
  }
}
