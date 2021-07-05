import { Request, Response } from 'express';
import { get } from 'lodash';
import { dbProductUnReserveStock } from '@src/use-cases/product-unreserve-stock';
import { findProduct } from '@src/use-cases/product-get';
import { dbUpdateReservationToken } from '@src/use-cases/reservation-token-update';
import log from '@src/utils/logger';
import { dbFindReservationToken } from '@src/use-cases/reservation-token-get';
import { makeMessageResponse } from '@src/controllers/message-response';
import { sellProductStock, isProductSold, isProductBelongsToReservationToken, isPosibleToSell, updateReservation } from '@src/use-cases/product-sell-stock';

export async function productSellStockHandler(req: Request, res: Response) {
  const productId = get(req, 'params.id');
  const reservationToken = get(req, 'body.reservationToken');

  log.info('sell product:' + productId + ' reservationToken:' + reservationToken);
  let product = await findProduct({ productId });
  let rtoken = await dbFindReservationToken({ reservationToken });

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

  if (!isPosibleToSell(product)) {
    return res.status(400).send(makeMessageResponse('Is not possible to sell check stock'));
  }

  product = sellProductStock(product);
  rtoken = updateReservation(rtoken);
  const param = {
    sold: true,
  };

  await dbProductUnReserveStock({ productId }, product, { new: true })
    .then(() => {
      return dbUpdateReservationToken({ ...req.body }, param , { new: true })
        .then(() => {
          return res.sendStatus(200);
        })
        .catch(() => {
          return res.status(500).send(makeMessageResponse('unable to update reservation token'));
        });
    })
    .catch(() => {
      return res.sendStatus(400);
    });
}
