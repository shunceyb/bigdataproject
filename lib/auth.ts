import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB();

        console.log("🔍 Searching user in database...");
        const user = await User.findOne({ email: credentials?.email }).select("+password");

        if (!user) {
          console.error("❌ User not found!");
          throw new Error("Wrong Email");
        }

        if (!user.role) {
          console.log("⚠️ User has no role, assigning 'user'");
          user.role = "user";
          await user.save(); // Save the role update in MongoDB
        }
      
        console.log("✅ User logged in:", user.email, "| Role:", user.role);

        const passwordMatch = await bcrypt.compare(credentials!.password, user.password);
        if (!passwordMatch) {
          console.error("❌ Incorrect Password!");
          throw new Error("Wrong Password");
        }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role || "user", // Ensure a role exists
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        console.log("🔑 Storing role in JWT token:", user.role);
        token.role = user.role; // Store role in token
      }
      return token;
    },
    async session({ session, token }) {
      console.log("🔄 Setting role in session:", token.role);

      if (session.user) {
        session.user.role = token.role as string; // ✅ Explicitly cast token.role as string
      }

      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};




