import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      profile(profile: { sub: string; name: string; email: string; picture: string }) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          // Only Biryanispot.kwt@gmail.com gets ADMIN rights, everyone else is a USER
          role: profile.email?.toLowerCase() === 'biryanispot.kwt@gmail.com' ? 'ADMIN' : 'USER'
        }
      }
    })
  ],
  session: {
    // We use JWT because CredentialsProvider requires JWT strategy
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async signIn({ user }) {
      // Only allow the admin email to sign in for now
      if (user.email?.toLowerCase() === 'biryanispot.kwt@gmail.com') {
        return true;
      }
      // Stop login for all other users and riders
      return false;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // ENFORCE ADMIN ONLY: If they are not an admin, we kill the session
      if (token.role !== 'ADMIN') {
        return null as any; 
      }

      if (session.user) {
        session.user.role = token.role as string;
        session.user.id = token.id as string;
      }
      return session;
    }
  },
  pages: {
    signIn: "/auth",
    error: "/auth",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };