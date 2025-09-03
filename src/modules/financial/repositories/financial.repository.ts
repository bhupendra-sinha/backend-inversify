import { inject, injectable } from 'inversify';
import { DocumentStatus } from '@utils/constant';
import { ILogger } from '@core/logger/logger.interface';
import TYPES from '@core/types';
import { FinancialDto } from '../data/request/financial_request.dto';
import { IFinancialRepository } from '../interfaces/financial.interface';

@injectable()
class FinancialRepository implements IFinancialRepository {
	constructor(@inject(TYPES.LOGGER) private logger: ILogger) {}

	async getBySessionId(sessionId: string) {
		this.logger.info('Getting financial document by session id', { sessionId });

		return {
			userSessionId: sessionId,
			bankStatement: {
				documentStatus: DocumentStatus.PENDING,
				statementDuration: {
					startDate: '2022-01-01',
					endDate: '2022-12-31'
				},
				statementOwner: 'test',
				totalCredits: 1000,
				totalDebits: 500
			},
			auditedFinancials: {
				documentStatus: DocumentStatus.PENDING,
				companyName: 'test',
				financialPeriod: {
					startDate: '2022-01-01',
					endDate: '2022-12-31'
				},
				grossRevenues: 1000,
				netProfits: 500
			}
		};
	}

	async uploadFinancialDocument(data: FinancialDto) {
		this.logger.info('uploading financial document', data);
		return { message: 'Financial document uploaded successfully' };
	}
}

export default FinancialRepository;
