"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Razer from "@/app/images/background.png";

// Import Lucide-react Icons
import { ListChecks, Headphones, Laptop, Gamepad2, ShieldCheck } from "lucide-react";

const ShoppingNavbar = ({ setSelectedCategory }: { setSelectedCategory: (category: string | null) => void }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [scrollY, setScrollY] = useState(0);

  // Parallax effect applied to the background (NOT the navbar)
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY * 0.3);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  return (
    <>
      {/* Parallax Background */}
      <div className="absolute top-0 left-0 w-full h-[50vh] bg-cover bg-center z-[-1]"
        style={{
          transform: `translateY(${scrollY}px)`,
        }}
      ></div>

      {/* Sticky Navbar */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-8 py-4 bg-black
                     backdrop-blur-lg shadow-md transition-all duration-300">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <Link href="/">
            <Image src={Razer} width={150} height={150} alt="Navbar logo" />
          </Link>
        </div>

        {/* Shopping Navbar Icons */}
        <div className="hidden md:flex gap-6 justify-center">
          {[
            { icon: <ListChecks size={24} />, category: null, label: "All Products" },
            { icon: <Headphones size={24} />, category: "Peripherals", label: "Peripherals" },
            { icon: <Laptop size={24} />, category: "Laptops", label: "Laptops" },
            { icon: <Gamepad2 size={24} />, category: "GamingGear", label: "Gaming Gear" }
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => setSelectedCategory(item.category)}
              className="text-green-400 hover:text-green-600 transition duration-300 flex flex-col items-center"
            >
              {item.icon}
              <span className="text-xs mt-1">{item.label}</span>
            </button>
          ))}

          {/* Admin Panel (Only for Admins) */}
          {session?.user?.role === "admin" && (
            <Link
              href="/admin"
              className="text-red-500 font-semibold flex flex-col items-center hover:text-red-700 transition duration-300"
            >
              <ShieldCheck size={24} />
              <span className="text-xs mt-1">Admin Panel</span>
            </Link>
          )}
        </div>

        {/* Auth Buttons */}
        {status === "loading" ? (
          <span className="text-gray-500 text-sm">Loading...</span>
        ) : status === "authenticated" ? (
          <div className="flex gap-4 items-center">
            <span className="text-green-400">Hello, {session.user.name}</span>
            <button
              onClick={handleLogout}
              className="px-5 py-2 border border-green-400 text-green-400 rounded-lg 
                     hover:bg-green-400 hover:text-black transition duration-300"
            >
              Log Out
            </button>
          </div>
        ) : (
          <Link
            href="/login"
            className="px-5 py-2 border border-green-400 text-green-400 rounded-lg 
                     hover:bg-green-400 hover:text-black transition duration-300"
          >
            Sign In
          </Link>
        )}
      </nav>
    </>
  );
};

export default ShoppingNavbar;
