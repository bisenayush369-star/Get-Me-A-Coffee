import NextAuth from "next-auth"
import GitHubProvider from "next-auth/providers/github"

import connectDb from "../../../db/connectDb"
import User from "../../../../models/User"

export const authOptions = {
  pages: {
  error: "/auth-error",
},
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        await connectDb()

        if (account.provider === "github") {
          const email = user.email || `${profile.login}@github.com`

          const existingUser = await User.findOne({ email })

          if (!existingUser) {
  await User.create({
    name: user.name || profile.login,
    username: profile.login,   // ✅ THIS WAS MISSING
    email,
    image: user.image,
  })
}
        }

        return true
      } catch (error) {
        console.error("SIGN IN ERROR:", error)
        return false
      }
    },

    async session({ session }) {
      await connectDb()

      if (session.user?.email) {
        const dbUser = await User.findOne({
          email: session.user.email,
        })

        if (dbUser) {
          session.user.username = dbUser.username
        }
      }

      return session
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
