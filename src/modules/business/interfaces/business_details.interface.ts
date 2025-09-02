import { BusinessDetailsDto } from '../data/request/business_details_request.dto';
import { IBusinessDetails, IBusinessDetailsResponse } from '../data/response/business_details_response.dto';

export interface IBusinessDetailsService {
	uploadBusinessDetailsDocument(data: BusinessDetailsDto): Promise<{ message: string }>;
	getBySessionId(sessionId: string): Promise<IBusinessDetailsResponse>;
}

export interface IBusinessDetailsRepository {
	uploadBusinessDetailsDocument(data: BusinessDetailsDto): Promise<{ message: string }>;
	getBySessionId(sessionId: string): Promise<IBusinessDetails>;
}
