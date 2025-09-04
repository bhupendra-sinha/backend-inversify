import { ValidationError } from '@core/data/error/app.error';
import { AppResponse } from '@core/data/response/app.response';
import { Request, Response, NextFunction } from 'express';
import { ZodError, ZodObject } from 'zod';
import multer from 'multer';

// export const validateMiddleware = (schema: ZodObject) => {
// 	return async (req: Request, res: Response, next: NextFunction) => {
// 		try {
// 			const validateData = await schema.parseAsync(req.body);
// 			req.body = validateData;
// 			next();
// 		} catch (error) {
// 			if (error instanceof ZodError) {
// 				const response = AppResponse.errorFromException(new ValidationError('Validation failed', error.format()));
// 				res.status(400).json(response);
// 				return;
// 			}
// 			next(error);
// 		}
// 	};
// };

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export const validateMiddleware = (schema: ZodObject<any>, fields?: { name: string; maxCount?: number }[]) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		upload.fields(fields || [])(req, res, async err => {
			if (err) {
				return res.status(400).json(AppResponse.error('FILE_UPLOAD_ERROR', err.message));
			}

			// Validate uploaded files dynamically
			const missingFiles = fields?.filter(field => !req.files || !(req.files as any)[field.name]) || [];

			if (missingFiles.length > 0) {
				return res
					.status(400)
					.json(
						AppResponse.error(
							'FILE_UPLOAD_ERROR',
							`Missing required files: ${missingFiles.map(f => f.name).join(', ')}`
						)
					);
			}

			fields?.forEach(field => {
				req.body[field.name] = (req.files as any)[field.name][0];
			});

			try {
				const validateData = await schema.parseAsync(req.body);
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
		});
	};
};
