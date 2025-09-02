import { DocumentStatus } from '@utils/constant';

export interface IBusinessAddress {
	documentStatus: DocumentStatus;
	documentType: string;
	companyName: string;
	address: string;
}

export interface IBusinessAddressResponse {
	userSessionId: string;
	document: IBusinessAddress;
}
