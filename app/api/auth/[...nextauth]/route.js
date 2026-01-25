import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import connectDb from "../../../db/connectDb";
import User from "../../../../models/User";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const authConfig = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn(params) {
      const { user, account, profile } = params;
      try {
        await connectDb();

        if (account.provider === "github") {
          const email = user.email || `${profile.login}@github.com`;
          let existingUser = await User.findOne({ email });

          if (!existingUser) {
            await User.create({
              name: user.name || profile.login,
              username: profile.login,
              email: email,
              image: user.image,
            });
          }
        }
        return true;
      } catch (error) {
        console.error("Sign in error:", error);
        return false;
      }
    },

    async jwt(params) {
      const { token, user, account } = params;
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    async session(params) {
      const { session, token } = params;
      try {
        await connectDb();

        if (session.user && session.user.email) {
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
};

const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };
