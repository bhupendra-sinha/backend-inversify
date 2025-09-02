import { BusinessAddressDto } from '../data/request/business_address_request.dto';
import { IBusinessAddress, IBusinessAddressResponse } from '../data/response/business_address_response.dto';

export interface IBusinessAddressService {
	uploadBusinessAddressDocument(data: BusinessAddressDto): Promise<{ message: string }>;
	getBySessionId(sessionId: string): Promise<IBusinessAddressResponse>;
}

export interface IBusinessAddressRepository {
	uploadBusinessAddressDocument(data: BusinessAddressDto): Promise<{ message: string }>;
	getBySessionId(sessionId: string): Promise<IBusinessAddress>;
}
