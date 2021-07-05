import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import Product, { ProductDocument } from '@src/entities/product/product';

export function dbSetProductInStock(
  query: FilterQuery<ProductDocument>,
  update: UpdateQuery<ProductDocument>,
  options: QueryOptions
) {
  return Product.findOneAndUpdate(query, update, options);
}
