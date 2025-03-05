"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import ShoppingNavbar from "../components/ShoppingNavbar";
import Shopproductbg from "@/app/images/Shopproductbg.jpg"; // Ensure image exists

type Product = {
  _id: string;
  name: string;
  category: string;
  quantity: number;
  imageUrl: string;
  description: string;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null); // ✅ Track selected category

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data: Product[]) => setProducts(data));
  }, []);

  // ✅ Filter products by selected category or search query
  const filteredProducts = products.filter((p) =>
    selectedCategory
      ? p.category.toLowerCase() === selectedCategory.toLowerCase()
      : p.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="relative min-h-screen w-full">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full -z-10">
        <Image
          src={Shopproductbg}
          alt="Razer-Themed Background"
          layout="fill"
          objectFit="cover"
          quality={100}
          className="opacity-90"
        />
      </div>

      {/* Navbar with setSelectedCategory Prop */}
      <ShoppingNavbar setSelectedCategory={setSelectedCategory} />

      {/* Page Content */}
      <div className="container mx-auto px-6 py-10">
        {/* Title */}
        <h1 className="text-4xl font-bold text-center text-green-500 bg-black p-4 rounded-lg font-razer mb-6">
          {selectedCategory ? `Category: ${selectedCategory}` : "Welcome to Razer Products"}
        </h1>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product._id} className="bg-gray-900 p-4 rounded-lg shadow-lg border border-green-500">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  width={300}
                  height={200}
                  className="w-full h-40 object-cover rounded-md"
                />
                <h3 className="text-xl font-bold mt-2 text-green-400">{product.name}</h3>
                <p className="text-gray-400">{product.category}</p>
                <p className="text-gray-400">Product Description: {product.description}</p>
                <p className="text-white font-semibold">Quantity: {product.quantity}</p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400 col-span-full">No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
