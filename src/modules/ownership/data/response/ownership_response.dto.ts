export interface IEmiratesIdDto {
	documentStatus: string;
	emiratesIdNumber: string;
	firstName: string;
	lastName: string;
	nationality: string;
	issuingDate: string;
	expiryDate: string;
	dateOfBirth: string;
	photograph: string;
	signature: string;
}

export interface IPassportDto {
	documentStatus: string;
	passportNumber: string;
	firstName: string;
	lastName: string;
	nationality: string;
	visaIssuingDate: string;
	visaExpiryDate: string;
	dateOfBirth: string;
	photograph: string;
}

export interface IOwnershipResponseDto {
	userSessionId: string;
	emiratesId: IEmiratesIdDto;
	passport: IPassportDto;
}
