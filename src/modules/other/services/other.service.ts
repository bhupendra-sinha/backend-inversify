import { inject, injectable } from 'inversify';
import { OtherDto } from '../data/request/other_request.dto';
import { Logger } from 'winston';
import TYPES from '@core/types';
import { IOtherService } from '../interfaces/other.interface';
import { IOtherRepository } from '../interfaces/other.interface';

@injectable()
class OtherService implements IOtherService {
	constructor(
		@inject(TYPES.LOGGER) private logger: Logger,
		@inject(TYPES.OTHER_REPOSITORY) private otherRepository: IOtherRepository
	) {}

	async getBySessionId(sessionId: string) {
		this.logger.info('Getting other document by session id', { sessionId });
		const response = await this.otherRepository.getBySessionId(sessionId);
		return response;
	}

	async uploadOtherDocument(data: OtherDto) {
		this.logger.info('uploading other document', data);
		const response = await this.otherRepository.uploadOtherDocument(data);
		return response;
	}
}

export default OtherService;
