import { Request, Response } from 'express';
import { get } from 'lodash';
import { dbSetProductInStock } from '@src/use-cases/product-set-in-stock';
import { findProduct } from '@src/use-cases/product-get';
import log from '@src/utils/logger';
import { createNewProduct } from '@src/use-cases/product-add';

export async function updateProductStockHandler(req: Request, res: Response) {
  const productId = get(req, 'params.id');

  log.info('set product:' + productId + ' stock:' + req.body.stock);
  const product = await findProduct({ productId });

  if (!product) {
    await createNewProduct(productId, req.body.stock)
      .then(() => {
        return res.sendStatus(200);
      })
      .catch(() => {
        return res.sendStatus(400);
      });
  } else {
    product.IN_STOCK = req.body.stock;
    product.updatedAt = new Date(Date.now());

    await dbSetProductInStock({ productId }, product, { new: true })
      .then(() => {
        return res.sendStatus(200);
      })
      .catch(() => {
        return res.sendStatus(400);
      });
  }
}
