import { FilterQuery, QueryOptions } from 'mongoose';
import Product, { ProductDocument } from '@src/entities/product/product';

export function findProduct(query: FilterQuery<ProductDocument>, options: QueryOptions = { lean: true }) {
  return Product.findOne(query, {}, options).select({ _id: 0, IN_STOCK: 1, RESERVED: 1, SOLD: 1 });
}

export function findAllProducts(query: FilterQuery<ProductDocument>, options: QueryOptions = { lean: true }) {
  return Product.find(query, {}, options).select({ _id: 0, productId: 1, IN_STOCK: 1, RESERVED: 1, SOLD: 1, createdAt: 1, updatedAt: 1});
}
