import { injectable, inject } from 'inversify';
import TYPES from '@core/types';
import { ILogger } from '@core/logger/logger.interface';
import { BusinessDto } from '../data/request/business_request.dto';
import BusinessRepository from '../repositories/business.repository';
import { IBusinessService } from '../interfaces/business.interface';

@injectable()
class BusinessService implements IBusinessService {
	constructor(
		@inject(TYPES.LOGGER) private logger: ILogger,
		@inject(TYPES.BUSINESS_REPOSITORY) private businessRepository: BusinessRepository
	) {}

	async uploadBusinessDocument(data: BusinessDto) {
		this.logger.info('uploading business document', data);
		const business = await this.businessRepository.uploadBusinessDocument(data);
		return business;
	}

	async getBySessionId(sessionId: string) {
		this.logger.info('Getting business document by session id', { sessionId });
		const business = await this.businessRepository.getBySessionId(sessionId);
		return { userSessionId: sessionId, tradeLicense: business };
	}
}

export default BusinessService;
