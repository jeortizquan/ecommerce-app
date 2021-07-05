import { DocumentDefinition } from 'mongoose';
import Reservation, { ReservationDocument } from '@src/entities/reservation/reservation';

export function dbCreateReservationToken(input: DocumentDefinition<ReservationDocument>) {
  return Reservation.create(input);
}
