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
	passport_number: string;
	first_name: string;
	last_name: string;
	nationality: string;
	issuing_country: string;
	date_of_issue: string;
	expiration_date: string;
	date_of_birth: string;
	photograph: string;
}

export interface IOwnershipResponseDto {
	userSessionId: string;
	emiratesId: IEmiratesIdDto;
	passport: IPassportDto;
}
