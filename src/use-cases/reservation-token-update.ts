import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import Reservation, { ReservationDocument } from '@src/entities/reservation/reservation';

export function dbUpdateReservationToken(
  query: FilterQuery<ReservationDocument>,
  update: UpdateQuery<ReservationDocument>,
  options: QueryOptions
) {
  return Reservation.findOneAndUpdate(query, update, options);
}
