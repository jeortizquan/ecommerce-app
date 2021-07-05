import { Request, Response } from 'express';
import { dbProductCreate } from '@src/use-cases/product-add';

export async function createProductHandler(req: Request, res: Response) {
  const { body } = req;
  const product = await dbProductCreate({ ...body });
  return res.send(product);
}
