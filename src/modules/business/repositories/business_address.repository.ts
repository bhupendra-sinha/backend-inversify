import { injectable, inject } from 'inversify';
import TYPES from '@core/types';
import { ILogger } from '@core/logger/logger.interface';
import { IBusinessAddressRepository } from '../interfaces/business_address.interface';
import { DocumentStatus } from '@utils/constant';
import { BusinessAddressDto } from '../data/request/business_address_request.dto';

@injectable()
class BusinessAddressRepository implements IBusinessAddressRepository {
	constructor(@inject(TYPES.LOGGER) private logger: ILogger) {}

	async uploadBusinessAddressDocument(data: BusinessAddressDto) {
		this.logger.info('uploading business document', data);
		// INFO :- the AI logic will add here
		return { message: 'Business details document uploaded successfully' };
	}

	async getBySessionId(sessionId: string) {
		this.logger.info('Getting business document by session id', { sessionId });
		// INFO :- the AI logic will add here
		return {
			documentStatus: DocumentStatus.PENDING,
			documentType: 'test',
			companyName: 'test',
			address: 'test'
		};
	}
}

export default BusinessAddressRepository;
