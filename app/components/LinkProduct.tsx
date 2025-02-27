"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import ProductBg from "@/app/images/Productbackground.jpg";
import Link from "next/link";

const LinkProduct = () => {
  const { data: session, status } = useSession(); // Fetch session
  console.log("Session Data:", session); // Debugging

  const userRole = session?.user?.role;

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  const redirectPath = userRole === "admin" ? "/admin" : "/products";

  return (
    <section
      id="products"
      className="relative flex flex-col justify-center items-center min-h-screen text-white px-4"
    >
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full -z-10">
        <Image
          src={ProductBg}
          alt="Razer Background"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div>

      {/* Title & Description */}
      <div className="flex flex-col items-center text-center absolute top-[20%] md:top-[15%] max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Razer Products</h1>
        <p className="text-lg md:text-xl text-gray-300">
          Explore the best gaming peripherals and accessories designed for gamers, by gamers.
        </p>
      </div>

      {/* Dynamic Button */}
      <div className="absolute bottom-[15%] md:bottom-[10%]">
        <Link href={redirectPath}>
          <button className="bg-green-500 hover:bg-green-600 text-black font-bold py-3 px-6 rounded-lg text-lg">
            {userRole === "admin" ? "Go to Admin Dashboard" : "Explore Now"}
          </button>
        </Link>
      </div>
    </section>
  );
};

export default LinkProduct;


