import { Request, Response } from 'express';

export async function welcomeHandler(req: Request, res: Response) {
  const welcomeInfo = {
		message: 'Welcome to e-commerce inventory service',
		productsInventory: 'GET /api/products',
    updateProductInventory: 'PATCH /api/products/:id/stock ::: params: product id ::: body: { stock: 100 }',
    reserveProductInventory: 'POST /api/products/:id/reserve ::: params: product id ::: body: none',
    unreserveProductInventory: 'POST /api/products/:id/unreserve ::: params: product id ::: body: { reservationToken: UUID }',
    sellProductInventory: 'POST /api/products/:id/sold ::: params: product id ::: body: { reservationToken: UUID }',
		timestamp: new Date(Date.now())
	};
  return res.status(200).send(welcomeInfo);
}