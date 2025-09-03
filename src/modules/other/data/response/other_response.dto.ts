export interface IMemorandumOfAssociation {
	documentStatus: string;
	companyName: string;
	registeredOffice: string;
	companyObjectives: string;
	shareholderDetails: string;
	capitalStructure: string;
	managementStructure: string;
	ownershipChanges: string;
	decisionMakingAuthority: string;
}

export interface IShareCertificate {
	documentStatus: string;
	companyName: string;
	shareholderName: string;
	jurisdiction: string;
	issueDate: string;
	shareholderNationality: string;
	numberOfShares: number;
}

export interface IBusinessProfile {
	documentStatus: string;
	companyName: string;
	businessActivity: string;
	productsOrServices: string;
	suppliersAndPartners: string;
}

export interface IVisa {
	documentStatus: string;
	companyName: string;
	issueDate: string;
	expiryDate: string;
	issueCountry: string;
	issueNumber: string;
	issueAuthority: string;
}

export interface IOtherResponse {
	memorandumOfAssociation: IMemorandumOfAssociation;
	shareCertificate: IShareCertificate;
	businessProfile: IBusinessProfile;
	visa: IVisa;
}
