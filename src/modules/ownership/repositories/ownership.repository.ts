import { injectable } from 'inversify';
import { IOwnershipRepository } from '../interfaces/ownership.interface';
import { OwnershipDto } from '../data/request/ownership_request.dto';
import TYPES from '@core/types';
import { ILogger } from '@core/logger/logger.interface';
import { inject } from 'inversify';

@injectable()
class OwnershipRepository implements IOwnershipRepository {
	constructor(@inject(TYPES.LOGGER) private logger: ILogger) {}

	async uploadOwnershipDocument(body: OwnershipDto) {
		this.logger.info('uploading ownership document', body);
		console.log(body);

		return { message: 'Ownership document uploaded successfully' };
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
