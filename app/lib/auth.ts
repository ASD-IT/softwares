import NextAuth from "next-auth";
import bcrypt from "bcryptjs";
import { z } from "zod";

// Providers
import CredentialsProvider from "next-auth/providers/credentials";
import { checkUserExists } from "./queries/users";

// Queries

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const parsedCredentials = z
            .object({ username: z.string(), password: z.string() })
            .safeParse(credentials);

          if (parsedCredentials.success) {
            const { username, password } = parsedCredentials.data;

            const user = await checkUserExists(username);

            if (!user) {
              console.log("User details are incorrect");
              return null;
            }

            const passwordsMatch = await bcrypt.compare(
              password.toString(),
              user.password as string
            );

            if (passwordsMatch) {
              return user;
            } else {
              return null;
            }
          }

          console.log("Invalid credentials");
          return null;
        } catch (error) {
          console.log("error", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: any; user?: any }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.username = user.username;
        token.name = user.name;
        token.role = user.role;
      }

      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      session.user = {
        id: token.id,
        email: token.email,
        username: token.username,
        name: token.name,
        role: token.role,
      };
      return session;
    },
    async signIn({}) {
      try {
        return true;
      } catch (error) {
        console.error("Error during signIn:", error);
        return false;
      }
    },
  },
};

export default NextAuth(authOptions);
