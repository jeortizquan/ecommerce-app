import { Request, Response } from 'express';
import { get } from 'lodash';
import { findAllProducts, findProduct } from '@src/use-cases/product-get';

export async function getProductHandler(req: Request, res: Response) {
  const productId = get(req, 'params.id');
  const product = await findProduct({ productId });

  if (!product) {
    return res.sendStatus(404);
  }

  return res.send(product);
}

export async function getAllProductsHandler(req: Request, res: Response) {
  const product = await findAllProducts({});

  if (!product) {
    return res.sendStatus(404);
  }

  return res.send(product);
}
