import mongoose from 'mongoose';

export interface ReservationDocument extends mongoose.Document {
  productId: string;
  reservationToken: string;
  sold: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ReservationSchema = new mongoose.Schema(
  {
    productId: { type: String, required: true },
    reservationToken: { type: String, unique: true, required: true },
    sold: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Reservation = mongoose.model<ReservationDocument>('Reservation', ReservationSchema);

export default Reservation;
