import { inject, injectable } from 'inversify';
import TYPES from '@core/types';
import { ILogger } from '@core/logger/logger.interface';
import { IBusinessDetailsRepository } from '../interfaces/business_details.interface';
import { DocumentStatus } from '@utils/constant';
import { BusinessDetailsDto } from '../data/request/business_details_request.dto';

@injectable()
class BusinessDetailsRepository implements IBusinessDetailsRepository {
	constructor(@inject(TYPES.LOGGER) private logger: ILogger) {}

	async uploadBusinessDetailsDocument(data: BusinessDetailsDto) {
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

export default BusinessDetailsRepository;
