import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import Product, { ProductDocument } from '@src/entities/product/product';

export function dbReserveStock(
  query: FilterQuery<ProductDocument>,
  update: UpdateQuery<ProductDocument>,
  options: QueryOptions
) {
  return Product.findOneAndUpdate(query, update, options);
}

export function reserveProductStock(p: ProductDocument): ProductDocument {
  let instock: number = p.IN_STOCK;
  let reserved: number = p.RESERVED;
  if (instock > 0) {
    instock -= 1;
    reserved += 1;
  }

  p.IN_STOCK = instock;
  p.RESERVED = reserved;

  return p;
}

export function isPosibleToReserve(p: ProductDocument): boolean {
  const instock: number = p.IN_STOCK;
  return instock - 1 > 0;
}