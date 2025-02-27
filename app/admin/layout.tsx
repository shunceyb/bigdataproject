
import { getServerSession } from "next-auth"; // Correct function
import { authOptions } from "@/lib/auth"; // Ensure this exists


export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions); // Corrected function

  if (!session || session.user.role !== "admin") {
    return <p>Access Denied</p>;
  }

  return <>{children}</>;
}
