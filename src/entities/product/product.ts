import mongoose from 'mongoose';
import Id from '@src/identity/identity';

export interface ProductDocument extends mongoose.Document {
  productId: string;
  IN_STOCK: number;
  RESERVED: number;
  SOLD: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      unique: true,
      required: true,
      default: () => Id.makeId(),
    },
    IN_STOCK: { type: Number, default: 0 },
    RESERVED: { type: Number, default: 0 },
    SOLD: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Product = mongoose.model<ProductDocument>('Product', ProductSchema);

export default Product;
