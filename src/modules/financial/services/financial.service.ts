import { injectable, inject } from 'inversify';
import TYPES from '@core/types';
import { IFinancialRepository, IFinancialService } from '../interfaces/financial.interface';
import { FinancialDto } from '../data/request/financial_request.dto';
import { ILogger } from '@core/logger/logger.interface';

@injectable()
class FinancialService implements IFinancialService {
	constructor(
		@inject(TYPES.FINANCIAL_REPOSITORY) private financialRepository: IFinancialRepository,
		@inject(TYPES.LOGGER) private logger: ILogger
	) {}

	async getBySessionId(sessionId: string) {
		this.logger.info('Getting financial document by session id', { sessionId });
		const response = await this.financialRepository.getBySessionId(sessionId);
		return response;
	}

	async uploadFinancialDocument(data: FinancialDto) {
		this.logger.info('uploading financial document', data);
		const response = await this.financialRepository.uploadFinancialDocument(data);
		return response;
	}
}

export default FinancialService;
