import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import fs from "fs";
import path from "path";

function readUsers() {
  const filePath = path.join(process.cwd(), "data", "users.json");
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const users = readUsers();
        const user = users.find(
          (u: any) =>
            u.email === credentials.email &&
            u.password === credentials.password &&
            u.status === "ACTIVE"
        );

        if (!user) return null;

        return {
          id: String(user.id),
          name: user.name,
          email: user.email,
          role: user.role,
          phone: user.phone,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.id = user.id;
        token.phone = (user as any).phone;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth",
    error: "/auth",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
