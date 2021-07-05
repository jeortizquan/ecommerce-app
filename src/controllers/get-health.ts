import { Request, Response } from 'express';

export async function healthHandler(req: Request, res: Response) {
  const healthInfo = {
		uptime: process.uptime(),
		status: 'OK',
		timestamp: new Date(Date.now())
	};
	try {
		return res.status(200).send(healthInfo);
	} catch (e) {
    healthInfo.status = e;
		return res.status(503).send(healthInfo);
	};
}