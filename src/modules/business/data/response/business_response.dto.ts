import { DocumentStatus } from '@utils/constant';

export interface IBusiness {
	documentStatus: DocumentStatus;
	companyName: string;
	tradeLicenseNumber: string;
	emirateOfRegistration: string;
	issueDate: Date;
	expiryDate: Date;
	dateOfIncorporation: Date;
	legalStatus: string;
	addressDetails: string;
}

export interface IBusinessResponse {
	userSessionId: string;
	tradeLicense: IBusiness;
}
