import { object, string, number } from 'yup';

const payload = {
  body: object({
    IN_STOCK: number().required('Initial stock is required').moreThan(-1).integer(),
  }),
};

const payloadSetInStock = {
  body: object({
    stock: number().required('Stock is required').moreThan(-1).integer(),
  }),
};

const payloadReservationToken = {
  body: object({
    reservationToken: string().required('reservation token is required'),
  }),
};

const params = {
  params: object({
    id: string().required('Product id is required'),
  }),
};

export const createProductSchema = object({
  ...payload,
});

export const setProductInStockSchema = object({
  ...params,
  ...payloadSetInStock,
});

export const reserveProductSchema = object({
  ...params,
});

export const unreserveProductSchema = object({
  ...params,
  ...payloadReservationToken,
});

export const soldProductSchema = object({
  ...params,
  ...payloadReservationToken,
});
