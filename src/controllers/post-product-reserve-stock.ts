import { Request, Response } from 'express';
import { get } from 'lodash';
import { dbReserveStock, isPosibleToReserve, reserveProductStock } from '@src/use-cases/product-reserve-stock';
import { findProduct } from '@src/use-cases/product-get';
import { dbCreateReservationToken } from '@src/use-cases/reservation-token-add';
import log from '@src/utils/logger';
import { ReservationDocument } from '@src/entities/reservation/reservation';
import Id from '@src/identity/identity';
import { makeMessageResponse } from '@src/controllers/message-response';

export async function productReserveStockHandler(req: Request, res: Response) {
  const productId = get(req, 'params.id');

  log.info('reserve product:' + productId);
  let product = await findProduct({ productId });

  if (!product) {
    return res.sendStatus(404);
  }
  
  if (!isPosibleToReserve(product)) {
    return res.status(400).send(makeMessageResponse('Is not possible to do reservation check stock'));
  }

  product = reserveProductStock(product);

  const reservation = {
    productId,
    reservationToken: Id.makeUUID(),
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
    sold: false,
  };

  await dbReserveStock({ productId }, product, { new: true })
    .then(() => {
      return dbCreateReservationToken({ ...reservation })
        .then((productReservation: ReservationDocument) => {
          const token = {
            reservationToken: productReservation.reservationToken,
          };
          return res.status(200).send(token);
        })
        .catch(() => {
          return res.status(500).send(makeMessageResponse('unable to generate reservation token'));
        });
    })
    .catch(() => {
      return res.sendStatus(400);
    });
}
