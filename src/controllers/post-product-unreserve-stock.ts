import { Request, Response } from 'express';
import { get } from 'lodash';
import { dbProductUnReserveStock } from '@src/use-cases/product-unreserve-stock';
import { findProduct } from '@src/use-cases/product-get';
import { dbRemoveReservationToken } from '@src/use-cases/reservation-token-remove';
import log from '@src/utils/logger';
import { dbFindReservationToken } from '@src/use-cases/reservation-token-get';
import { makeMessageResponse } from '@src/controllers/message-response';
import { isProductSold, isProductBelongsToReservationToken, isPosibleToUnReserve, unreserveProductStock } from '@src/use-cases/product-unreserve-stock';

export async function productUnReserveStockHandler(req: Request, res: Response) {
  const productId = get(req, 'params.id');
  const reservationToken = get(req, 'body.reservationToken');

  log.info('unreserve stock:' + productId + 'reservationToken:' + reservationToken);
  let product = await findProduct({ productId });
  const rtoken = await dbFindReservationToken({ reservationToken });

  if (!product) {
    return res.sendStatus(404);
  }

  if (!rtoken) {
    return res.status(404).send(makeMessageResponse('reservation token not found'));
  }

  if (isProductSold(rtoken)) {
    return res.status(400).send(makeMessageResponse('product is already sold'));
  }

  if (!isProductBelongsToReservationToken(rtoken, productId)) {
    return res.status(400).send(makeMessageResponse('product id does not belong to reservation token'));
  }

  if (!isPosibleToUnReserve(product)) {
    return res.status(400).send(makeMessageResponse('Is not possible to do unreserve check stock'));
  }

  product = unreserveProductStock(product);

  await dbProductUnReserveStock({ productId }, product, { new: true })
    .then(() => {
      return dbRemoveReservationToken({ ...req.body })
        .then(() => {
          return res.sendStatus(200);
        })
        .catch(() => {
          return res.status(500).send(makeMessageResponse('unable to remove reservation token'));
        });
    })
    .catch(() => {
      return res.sendStatus(400);
    });
}
