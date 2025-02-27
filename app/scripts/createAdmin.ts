import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

const createAdmin = async () => {
  await connectDB();

  const existingAdmin = await User.findOne({ email: "admin@example.com" });
  if (existingAdmin) {
    console.log("Admin already exists!");
    return;
  }

  const hashedPassword = await bcrypt.hash("Admin@123", 10);
  const adminUser = new User({
    name: "Admin",
    email: "admin@example.com",
    password: hashedPassword,
    role: "admin",  // 👈 Make it an admin
  });

  await adminUser.save();
  console.log("Admin created successfully!");
};

createAdmin();
