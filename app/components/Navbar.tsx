"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Razer from "@/app/images/background.png";

const Navbar = () => {
  const { status } = useSession();
  const router = useRouter();
  const [scrollY, setScrollY] = useState(0);

  // Parallax effect applied to the background (NOT the navbar)
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY * 0.3); // Adjust speed if needed
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
      <div
        className="absolute top-0 left-0 w-full h-[50vh] bg-cover bg-center z-[-1]"
        style={{
           // Change this to your background image
          transform: `translateY(${scrollY}px)`,
        }}
      ></div>

      {/* Sticky Navbar */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-8 py-4 bg-black
                     backdrop-blur-lg shadow-md transition-all duration-300">
        {/* Logo (Does NOT move) */}
        <div className="flex items-center gap-4">
          <Link href="/">
            <Image src={Razer} width={150} height={150} alt="Navbar logo" />
          </Link>
        </div>

        {/* Navbar Links */}
        <div className="hidden md:flex gap-6 justify-center">
          {["Home", "About", "Products", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-green-400 hover:text-green-600 transition duration-300"
            >
              {item}
            </a>
          ))}
        </div>

        {/* Auth Buttons */}
        {status === "loading" ? (
          <span className="text-gray-500 text-sm">Loading...</span>
        ) : status === "authenticated" ? (
          <button
            onClick={handleLogout}
            className="px-5 py-2 border border-green-400 text-green-400 rounded-lg 
                     hover:bg-green-400 hover:text-black transition duration-300"
          >
            Log Out
          </button>
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

export default Navbar;
