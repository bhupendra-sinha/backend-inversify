import { injectable } from 'inversify';
import { IOwnershipRepository, IOwnershipService } from '../interfaces/ownership.interface';
import TYPES from '@core/types';
import { ILogger } from '@core/logger/logger.interface';
import { inject } from 'inversify';
import { OwnershipDto } from '../data/request/ownership_request.dto';

@injectable()
class OwnershipService implements IOwnershipService {
	constructor(
		@inject(TYPES.LOGGER) private logger: ILogger,
		@inject(TYPES.OWNERSHIP_REPOSITORY) private businessRepository: IOwnershipRepository
	) {}

	async uploadOwnershipDocument(data: OwnershipDto) {
		this.logger.info('uploading business document', data);
		const business = await this.businessRepository.uploadOwnershipDocument(data);
		return business;
	}

	async getBySessionId(sessionId: string) {
		this.logger.info('Getting business document by session id', { sessionId });
		const business = await this.businessRepository.getBySessionId(sessionId);
		return business;
	}
}

export default OwnershipService;
