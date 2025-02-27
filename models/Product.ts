import mongoose, { Schema, Document } from "mongoose";

interface IProduct extends Document {
  name: string;
  category: string;
  quantity: number;
  imageUrl: string;
}

const ProductSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  category: { type: String, required: true },
  quantity: { type: Number, required: true },
  imageUrl: { type: String, required: true },
});

const Product = mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);
export default Product