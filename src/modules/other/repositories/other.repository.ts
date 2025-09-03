import { inject, injectable } from 'inversify';
import { OtherDto } from '../data/request/other_request.dto';
import { IOtherRepository } from '../interfaces/other.interface';
import { Logger } from 'winston';
import TYPES from '@core/types';
import { DocumentStatus } from '@utils/constant';

@injectable()
class OtherRepository implements IOtherRepository {
	constructor(@inject(TYPES.LOGGER) private logger: Logger) {}

	async getBySessionId(sessionId: string) {
		this.logger.info('Getting other document by session id', { sessionId });
		// INFO :- the AI logic will add here
		return {
			memorandumOfAssociation: {
				documentStatus: DocumentStatus.PENDING,
				companyName: 'test',
				registeredOffice: 'test',
				companyObjectives: 'test',
				shareholderDetails: 'test',
				capitalStructure: 'test',
				managementStructure: 'test',
				ownershipChanges: 'test',
				decisionMakingAuthority: 'test'
			},
			shareCertificate: {
				documentStatus: DocumentStatus.PENDING,
				companyName: 'test',
				shareholderName: 'test',
				jurisdiction: 'test',
				issueDate: 'test',
				shareholderNationality: 'test',
				numberOfShares: 100
			},
			businessProfile: {
				documentStatus: DocumentStatus.PENDING,
				companyName: 'test',
				businessActivity: 'test',
				productsOrServices: 'test',
				suppliersAndPartners: 'test'
			},
			visa: {
				documentStatus: DocumentStatus.PENDING,
				companyName: 'test',
				issueDate: 'test',
				expiryDate: 'test',
				issueCountry: 'test',
				issueNumber: 'test',
				issueAuthority: 'test'
			}
		};
	}

	async uploadOtherDocument(data: OtherDto) {
		this.logger.info('uploading other document', data);
		return { message: 'Other document uploaded successfully' };
	}
}

export default OtherRepository;
