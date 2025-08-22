import { ValidationError } from '@core/data/error/app.error';
import { AppResponse } from '@core/data/response/app.response';
import { Request, Response, NextFunction } from 'express';
import { ZodError, ZodObject } from 'zod';

export const validateMiddleware = (schema: ZodObject) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			const validateData = await schema.parseAsync(req.body);
			console.log('VALIDATE DATA', validateData);
			req.body = validateData;
			next();
		} catch (error) {
			if (error instanceof ZodError) {
				const response = AppResponse.errorFromException(new ValidationError('Validation failed', error.format()));
				res.status(400).json(response);
				return;
			}
			next(error);
		}
	};
};
