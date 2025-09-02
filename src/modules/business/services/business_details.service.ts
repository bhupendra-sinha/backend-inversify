import { injectable, inject } from 'inversify';
import TYPES from '@core/types';
import { ILogger } from '@core/logger/logger.interface';
import { BusinessDetailsDto } from '../data/request/business_details_request.dto';
import BusinessRepository from '../repositories/business_details.repository';
import { IBusinessDetailsService } from '../interfaces/business_details.interface';

@injectable()
class BusinessDetailsService implements IBusinessDetailsService {
	constructor(
		@inject(TYPES.LOGGER) private logger: ILogger,
		@inject(TYPES.BUSINESS_REPOSITORY) private businessRepository: BusinessRepository
	) {}

	async uploadBusinessDetailsDocument(data: BusinessDetailsDto) {
		this.logger.info('uploading business document', data);
		const business = await this.businessRepository.uploadBusinessDetailsDocument(data);
		return business;
	}

	async getBySessionId(sessionId: string) {
		this.logger.info('Getting business document by session id', { sessionId });
		const business = await this.businessRepository.getBySessionId(sessionId);
		return { userSessionId: sessionId, tradeLicense: business };
	}
}

export default BusinessDetailsService;
