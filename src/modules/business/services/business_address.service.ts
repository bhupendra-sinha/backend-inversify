import TYPES from '@core/types';
import { injectable, inject } from 'inversify';
import { ILogger } from '@core/logger/logger.interface';
import { BusinessAddressDto } from '../data/request/business_address_request.dto';
import { IBusinessAddressService } from '../interfaces/business_address.interface';
import { IBusinessAddressRepository } from '../interfaces/business_address.interface';

@injectable()
class BusinessAddressService implements IBusinessAddressService {
	constructor(
		@inject(TYPES.LOGGER) private logger: ILogger,
		@inject(TYPES.BUSINESS_ADDRESS_REPOSITORY) private businessRepository: IBusinessAddressRepository
	) {}

	async uploadBusinessAddressDocument(data: BusinessAddressDto) {
		this.logger.info('uploading business document', data);
		const business = await this.businessRepository.uploadBusinessAddressDocument(data);
		return business;
	}

	async getBySessionId(sessionId: string) {
		this.logger.info('Getting business document by session id', { sessionId });
		const business = await this.businessRepository.getBySessionId(sessionId);
		return { userSessionId: sessionId, document: business };
	}
}

export default BusinessAddressService;
