import { DocumentDefinition } from 'mongoose';
import Product, { ProductDocument } from '@src/entities/product/product';

export function dbProductCreate(input: DocumentDefinition<ProductDocument>) {
  return Product.create(input);
}

export function createNewProduct(productId: string, instock: number) {
  const anewproduct = {
    productId,
    IN_STOCK: instock,
    RESERVED: 0,
    SOLD: 0,
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  };
  return dbProductCreate({ ...anewproduct });
}
