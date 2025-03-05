import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";

// 🟢 Get All Products (For Users & Admin)
export async function GET() {
  await connectDB();
  const products = await Product.find({});
  return NextResponse.json(products);
}

export async function POST(req: Request) {
    await connectDB();
    
    const { _id, ...data } = await req.json(); // ✅ Ignore _id if provided
  
    // ✅ Ensure only valid fields are inserted
    const newProduct = await Product.create({
      name: data.name,
      category: data.category,
      quantity: data.quantity,
      imageUrl: data.imageUrl,
      description: data.description
    });
  
    return NextResponse.json(newProduct, { status: 201 });
  }

// 🟠 Update Product (Admin Only)
export async function PUT(req: Request) {
  await connectDB();
  const { _id, ...updates } = await req.json();
  const updatedProduct = await Product.findByIdAndUpdate(_id, updates, { new: true });
  return NextResponse.json(updatedProduct);
}

// 🔴 Delete Product (Admin Only)
export async function DELETE(req: Request) {
  await connectDB();
  const { _id } = await req.json();
  await Product.findByIdAndDelete(_id);
  return NextResponse.json({ message: "Deleted successfully" });
}
