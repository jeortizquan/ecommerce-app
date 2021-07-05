import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import Product, { ProductDocument } from '@src/entities/product/product';
import { ReservationDocument } from '@src/entities/reservation/reservation';

export function dbProductUnReserveStock(query: FilterQuery<ProductDocument>, update: UpdateQuery<ProductDocument>, options: QueryOptions) {
  return Product.findOneAndUpdate(query, update, options);
}

export function unreserveProductStock(p: ProductDocument): ProductDocument {
  let instock: number = p.IN_STOCK;
  let reserved: number = p.RESERVED;
  if (reserved > 0) {
    instock += 1;
    reserved -= 1;
  }

  p.IN_STOCK = instock;
  p.RESERVED = reserved;
  p.updatedAt = new Date(Date.now());

  return p;
}

export function isPosibleToUnReserve(p: ProductDocument): boolean {
  const reserved: number = p.RESERVED;
  return reserved - 1 >= 0;
}

export function isProductSold(r: ReservationDocument): boolean {
  return r.sold;
}

export function isProductBelongsToReservationToken(r: ReservationDocument, productId: string): boolean {
  return r.productId === productId;
}
