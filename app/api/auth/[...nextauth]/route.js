import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

import connectDb from "../../../db/connectDb";
import User from "../../../../models/User";

// ✅ Mark this route as dynamic
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// ✅ Ensure providers are always available
const getProviders = () => {
  const providers = [];
  
  if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
    providers.push(
      GitHubProvider({
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
      })
    );
  }
  
  return providers;
};

export const authOptions = {
  providers: getProviders(),
  
  pages: {
    signIn: "/login",
    error: "/auth/error",
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        await connectDb();

        if (account?.provider === "github") {
          const email = user.email || `${profile.login}@github.com`;

          let existingUser = await User.findOne({ email });

          if (!existingUser) {
            await User.create({
              name: user.name || profile.login,
              username: profile.login,
              email,
              image: user.image,
            });
          }
        }

        return true;
      } catch (error) {
        console.error("SIGN IN ERROR:", error);
        return false;
      }
    },

    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
      }

      try {
        await connectDb();

        if (session.user?.email) {
          const dbUser = await User.findOne({
            email: session.user.email,
          });

          if (dbUser) {
            session.user.username = dbUser.username;
          }
        }
      } catch (error) {
        console.error("Session callback error:", error);
      }

      return session;
    },
  },

  events: {
    async signIn({ user, account, profile, isNewUser }) {
      console.log(`User ${user.email} signed in`);
    },
  },

  debug: process.env.NODE_ENV === "development",

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
