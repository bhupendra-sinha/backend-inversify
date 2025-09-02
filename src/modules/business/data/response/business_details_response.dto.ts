import { DocumentStatus } from '@utils/constant';

export interface IBusinessDetails {
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

export interface IBusinessDetailsResponse {
	userSessionId: string;
	tradeLicense: IBusinessDetails;
}
