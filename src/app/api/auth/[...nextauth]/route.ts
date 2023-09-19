import prisma from "@/libs/prismadb";
import bcrypt from "bcrypt";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth from "next-auth/next";

import { getServerSession } from "next-auth";

const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        const isCorrect = bcrypt.compareSync(
          credentials.password,
          user?.hashedPassowrd as string,
        );

        if (!isCorrect) {
          throw new Error("Invalid credentials");
        }

        return user;
      },
    }),
  ],
  debug: (process.env.NODE_ENV as string) === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET as string,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
