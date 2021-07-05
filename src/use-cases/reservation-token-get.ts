import { FilterQuery, QueryOptions } from 'mongoose';
import Reservation, { ReservationDocument } from '@src/entities/reservation/reservation';

export function dbFindReservationToken(query: FilterQuery<ReservationDocument>, options: QueryOptions = { lean: true }) {
  return Reservation.findOne(query, {}, options).select({ _id: 0, productId: 1, reservationToken: 1, sold: 1 });
}
