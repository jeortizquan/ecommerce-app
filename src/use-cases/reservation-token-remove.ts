import { FilterQuery } from 'mongoose';
import Reservation, { ReservationDocument } from '@src/entities/reservation/reservation';

export function dbRemoveReservationToken(query: FilterQuery<ReservationDocument>) {
  return Reservation.deleteOne(query);
}
