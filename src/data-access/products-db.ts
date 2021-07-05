/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable import/prefer-default-export */
import { DocumentDefinition } from 'mongoose';
import Product, { ProductDocument } from '@src/entities/product/product';
import log from '@src/utils/logger';

export function createProduct(input: DocumentDefinition<ProductDocument>) {
  return Product.create(input);
}