import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import Product, { ProductDocument } from '@src/entities/product/product';
import { ReservationDocument } from '@src/entities/reservation/reservation';

export function dbProductSellStock(
  query: FilterQuery<ProductDocument>,
  update: UpdateQuery<ProductDocument>,
  options: QueryOptions
) {
  return Product.findOneAndUpdate(query, update, options);
}

export function sellProductStock(p: ProductDocument): ProductDocument {
  let reserved: number = p.RESERVED;
  let sold: number = p.SOLD;
  if (reserved > 0) {
    sold += 1;
    reserved -= 1;
  }

  p.RESERVED = reserved;
  p.SOLD = sold;
  p.updatedAt = new Date(Date.now());

  return p;
}

export function updateReservation(r: ReservationDocument): ReservationDocument {
  r.sold = true;
  r.updatedAt = new Date(Date.now());

  return r;
}

export function isPosibleToSell(p: ProductDocument): boolean {
  const reserved: number = p.RESERVED;
  return reserved - 1 >= 0;
}

export function isProductSold(r: ReservationDocument): boolean {  
  return r.sold;
}

export function isProductBelongsToReservationToken(r: ReservationDocument, productId: string): boolean {
  return r.productId === productId;
}
