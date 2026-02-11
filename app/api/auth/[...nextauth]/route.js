import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import connectDb from "../../../db/connectDb";
import User from "../../../../models/User";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// ========== DEBUG LOGGING ==========
const clientId = process.env.GITHUB_CLIENT_ID || "";
const clientSecret = process.env.GITHUB_CLIENT_SECRET || "";

console.log("=== NEXTAUTH INIT ===");
console.log("NEXTAUTH_URL:", process.env.NEXTAUTH_URL);
console.log("NEXTAUTH_SECRET exists:", !!process.env.NEXTAUTH_SECRET);
console.log("GITHUB_CLIENT_ID:", clientId);
console.log("GITHUB_CLIENT_SECRET exists:", !!clientSecret);
console.log("GITHUB_CLIENT_SECRET first 10 chars:", clientSecret.substring(0, 10));
console.log("Node env:", process.env.NODE_ENV);
console.log("=== END DEBUG ===\n");

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  trustHost: true,
  debug: process.env.NODE_ENV === "development", // Enable NextAuth debug in dev
  
  providers: [
    GitHubProvider({
      clientId: clientId,
      clientSecret: clientSecret,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  
  pages: {
    signIn: "/login",
    error: "/auth/error",
  },
  
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },

  callbacks: {
    async signIn(params) {
      const { user, account, profile } = params;
      try {
        if (!global.mongoose) {
  await connectDb();
}

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
        return true;
      }
    },

    async jwt(params) {
      const { token, user } = params;
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    async session(params) {
      const { session } = params;
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

const handler = NextAuth(authOptions);

// Middleware to log OAuth redirect
const loggingHandler = (req, res) => {
  if (req.url && req.url.includes("/signin/github")) {
    console.log("\n=== GITHUB SIGNIN REQUEST ===");
    console.log("URL:", req.url);
    console.log("Query:", req.query);
    console.log("=== END SIGNIN ===\n");
  }
  return handler(req, res);
};

export { loggingHandler as GET, loggingHandler as POST };
