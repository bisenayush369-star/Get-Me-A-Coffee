import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

import connectDb from "../../../db/connectDb";
import User from "../../../../models/User";

// ✅ Mark this route as dynamic (API routes are always dynamic, but explicit is better)
export const dynamic = "force-dynamic";

// ✅ Guard against missing env vars during build
const gitHubProvider = process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET
  ? GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    })
  : null;

export const authOptions = {
  providers: gitHubProvider ? [gitHubProvider] : [],

  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        await connectDb();

        if (account.provider === "github") {
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

    async session({ session }) {
      await connectDb();

      if (session.user?.email) {
        const dbUser = await User.findOne({
          email: session.user.email,
        });

        if (dbUser) {
          session.user.username = dbUser.username;
        }
      }

      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET || "default-secret-for-build-only",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
