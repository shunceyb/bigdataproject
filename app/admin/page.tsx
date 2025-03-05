"use client";
import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

type Product = {
  _id?: string;
  name: string;
  category: string;
  quantity: number;
  imageUrl: string;
  description: string
};

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<Product>({
    name: "",
    category: "",
    description: "",
    quantity: 0,
    imageUrl: "",
  });
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await fetch("/api/products");
    const data: Product[] = await res.json();
    setProducts(data);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (editingProductId) {
      await fetch("/api/products", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: editingProductId, ...form }),
      });
    } else {
      await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    }

    setForm({ name: "", category: "", quantity: 0, imageUrl: "", description: "" });
    setEditingProductId(null);
    fetchProducts();
  };

  const handleEdit = (product: Product) => {
    setForm({
      name: product.name,
      description: product.description,
      category: product.category,
      quantity: product.quantity,
      imageUrl: product.imageUrl,
    });
    setEditingProductId(product._id ?? null);
  };

  const handleDelete = async (_id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    await fetch("/api/products", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id }),
    });

    fetchProducts();
  };

  return (
    <div className="min-h-screen bg-black text-green-400 p-6">
      {/* Back Button */}
      <div className="flex items-center mb-6">
        <Link href="/">
        <button className="flex items-center space-x-2 text-green-400 hover:text-green-500 transition">
          <ArrowLeft size={32} />
          <span className="text-lg">Back to Dashboard</span>
        </button>
        </Link>
      </div>

      {/* Title */}
      <h1 className="text-4xl font-bold text-center mb-6 border-b border-green-500 pb-3">
        Admin - Manage Products
      </h1>

      {/* Form Section */}
      <div className="max-w-3xl mx-auto bg-gray-900 p-6 rounded-lg shadow-lg border border-green-500">
        <h2 className="text-2xl font-semibold mb-4">
          {editingProductId ? "Edit Product" : "Add New Product"}
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full p-3 rounded-md bg-gray-800 text-white border border-green-500 focus:ring-2 focus:ring-green-400"
          />
          <input
            type="text"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full p-3 rounded-md bg-gray-800 text-white border border-green-500 focus:ring-2 focus:ring-green-400"
          />
          <input
            type="text"
            placeholder="Category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full p-3 rounded-md bg-gray-800 text-white border border-green-500 focus:ring-2 focus:ring-green-400"
          />
          <input
            type="number"
            placeholder="Quantity"
            value={form.quantity}
            onChange={(e) =>
              setForm({ ...form, quantity: parseInt(e.target.value) || 0 })
            }
            className="w-full p-3 rounded-md bg-gray-800 text-white border border-green-500 focus:ring-2 focus:ring-green-400"
          />
          <input
            type="text"
            placeholder="Image URL"
            value={form.imageUrl}
            onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
            className="w-full p-3 rounded-md bg-gray-800 text-white border border-green-500 focus:ring-2 focus:ring-green-400"
          />
          <button
            type="submit"
            className="w-full bg-green-500 text-black font-bold py-3 rounded-lg hover:bg-green-600 transition duration-300"
          >
            {editingProductId ? "Update Product" : "Add Product"}
          </button>
        </form>
      </div>

      {/* Product List */}
      <div className="mt-10 max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) =>
            p._id ? (
              <div
                key={p._id}
                className="bg-gray-900 p-4 rounded-lg shadow-lg border border-green-500 transition hover:shadow-green-500"
              >
                <img
                  src={p.imageUrl}
                  alt={p.name}
                  className="w-full h-40 object-cover rounded-md"
                />
                <h3 className="text-xl font-bold mt-2 text-green-400">
                  {p.name}
                </h3>
                <p className="text-gray-400">{p.category}</p>
                <p className="text-gray-400">Product Description: {p.description}</p>
                <p className="text-white font-semibold">Quantity: {p.quantity}</p>
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => handleEdit(p)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p._id!)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ) : null
          )}
        </div>
      </div>
    </div>
  );
}



