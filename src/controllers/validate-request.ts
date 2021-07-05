import { AnySchema } from 'yup';
import { Request, Response, NextFunction } from 'express';
import log from '@src/utils/logger';

const validate = (schema: AnySchema) => async (req: Request, res: Response, next: NextFunction) => {
  await schema
    .validate({
      body: req.body,
      query: req.query,
      params: req.params,
    })
    .then(() => {
      return next();
    })
    .catch(e => {
      log.error(e);
      return res.status(400).json({ error: e.errors.join(', ') });
    });
};

export default validate;
