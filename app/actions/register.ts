"use server";

import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const register = async (values: { email: string; password: string; name: string }) => {
  const { email, password, name } = values; // ❌ Remove role input (Prevents admin manipulation)

  try {
    await connectDB();
    const userFound = await User.findOne({ email });

    if (userFound) {
      return { error: "Email already exists!" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: "user", // ✅ Hardcoded role to "user"
    });

    await newUser.save();

    console.log("✅ New user created:", newUser.email, "| Role:", newUser.role);

    return { success: "User registered successfully!" };
  } catch (e) {
    console.error("❌ Registration error:", e);
    return { error: "Something went wrong!" };
  }
};
