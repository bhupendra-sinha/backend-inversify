import { injectable } from 'inversify';
import { IOwnershipRepository } from '../interfaces/ownership.interface';
import { OwnershipDto } from '../data/request/ownership_request.dto';
import TYPES from '@core/types';
import { ILogger } from '@core/logger/logger.interface';
import { inject } from 'inversify';
import FormData from 'form-data';
import { HttpClientService } from '@core/services/http_AI.service';
import { RedisService } from '@core/services/redis.service';
import crypto from 'crypto';

@injectable()
class OwnershipRepository implements IOwnershipRepository {
	constructor(
		@inject(TYPES.LOGGER) private logger: ILogger,
		@inject(TYPES.HTTP_AI) private httpAi: HttpClientService,
		@inject(TYPES.REDIS_SERVICE) private redisService: RedisService
	) {}

	async uploadOwnershipDocument(body: OwnershipDto) {
		this.logger.info('uploading ownership document', { userSessionId: body.userSessionId });

		// INFO :- generate hash for file buffer
		const hash = crypto.createHash('sha256').update(body.passport.buffer).digest('hex');

		const hashKey = `ownership:${body.userSessionId}:${hash}`;

		// INFO :- check if file is already processed
		const cachedResult = await this.redisService.get(hashKey);
		if (cachedResult) {
			this.logger.info('Ownership document already processed', { userSessionId: body.userSessionId });
			return { message: 'Ownership document already processed', data: cachedResult };
		}

		// TODO :- will increase the code quality and manage it in a best way

		// INFO:- passport
		const formData = new FormData();
		formData.append('passport', body.passport.buffer, body.passport.originalname);

		this.logger.info('calling fastApi', { userSessionId: body.userSessionId });
		const passportResponse = await this.httpAi.post('/passport/analyze', formData, {
			headers: formData.getHeaders()
		});

		// INFO:- emirates_id
		// const formData = new FormData();
		// formData.append('emirates_id', body.emiratesId.buffer, body.emiratesId.originalname);

		// this.logger.info('calling fastApi', { userSessionId: body.userSessionId });
		// const emiratesIdResponse = await this.httpAi.post('/emirates_id/analyze', formData, {
		// 	headers: formData.getHeaders()
		// });

		// INFO :- store result in redis
		await this.redisService.set(hashKey, passportResponse, 5 * 60);

		console.log('fastApi response', passportResponse);

		this.logger.info('fastApi response', { userSessionId: body.userSessionId, passportResponse });

		return { message: 'Ownership document uploaded successfully', data: passportResponse };
	}

	async getBySessionId(sessionId: string) {
		return {
			userSessionId: sessionId,
			emiratesId: {
				documentStatus: 'VERIFIED',
				emiratesIdNumber: 'string',
				firstName: 'string',
				lastName: 'string',
				nationality: 'string',
				issuingDate: 'YYYY-MM-DD',
				expiryDate: 'YYYY-MM-DD',
				dateOfBirth: 'YYYY-MM-DD',
				photograph: 'image_url_or_base64',
				signature: 'image_url_or_base64'
			},
			passport: {
				documentStatus: 'VERIFIED',
				passportNumber: 'string',
				firstName: 'string',
				lastName: 'string',
				nationality: 'string',
				visaIssuingDate: 'YYYY-MM-DD',
				visaExpiryDate: 'YYYY-MM-DD',
				dateOfBirth: 'YYYY-MM-DD',
				photograph: 'image_url_or_base64'
			}
		};
	}
}

export default OwnershipRepository;
