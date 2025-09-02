import { inject, injectable } from 'inversify';
import { BusinessDto } from '../data/request/business_request.dto';
import TYPES from '@core/types';
import { ILogger } from '@core/logger/logger.interface';
import { IBusinessRepository } from '../interfaces/business.interface';
import { DocumentStatus } from '@utils/constant';

@injectable()
class BusinessRepository implements IBusinessRepository {
	constructor(@inject(TYPES.LOGGER) private logger: ILogger) {}

	async uploadBusinessDocument(data: BusinessDto) {
		this.logger.debug('Creating business document', data);
		// INFO :- the AI logic will add here
		return { message: 'Business details document uploaded successfully' };
	}

	async getBySessionId(sessionId: string) {
		this.logger.info('Getting business document by session id', { sessionId });
		return {
			documentStatus: DocumentStatus.PENDING,
			companyName: 'test',
			tradeLicenseNumber: 'test',
			emirateOfRegistration: 'test',
			issueDate: new Date(),
			expiryDate: new Date(),
			dateOfIncorporation: new Date(),
			legalStatus: 'test',
			addressDetails: 'test'
		};
	}
}

export default BusinessRepository;
