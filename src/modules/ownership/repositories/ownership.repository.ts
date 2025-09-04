import { injectable } from 'inversify';
import { IOwnershipRepository } from '../interfaces/ownership.interface';
import { OwnershipDto } from '../data/request/ownership_request.dto';
import TYPES from '@core/types';
import { ILogger } from '@core/logger/logger.interface';
import { inject } from 'inversify';
import FormData from 'form-data';
import axios from 'axios';

@injectable()
class OwnershipRepository implements IOwnershipRepository {
	constructor(@inject(TYPES.LOGGER) private logger: ILogger) {}

	async uploadOwnershipDocument(body: OwnershipDto) {
		this.logger.info('uploading ownership document', { userSessionId: body.userSessionId });

		const formData = new FormData();
		formData.append('passport', body.passport.buffer, body.passport.originalname);

		const response = await axios.post('http://127.0.0.1:8000/api/v1/documents/passport/analyze', formData, {
			headers: formData.getHeaders()
		});

		console.log('FastAPI response:', response.data);

		return { message: 'Ownership document uploaded successfully', data: response.data };
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
