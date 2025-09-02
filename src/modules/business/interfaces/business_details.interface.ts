import { BusinessDetailsDto } from '../data/request/business_details_request.dto';
import { IBusiness, IBusinessResponse } from '../data/response/business_details_response.dto';

export interface IBusinessDetailsService {
	uploadBusinessDetailsDocument(data: BusinessDetailsDto): Promise<{ message: string }>;
	getBySessionId(sessionId: string): Promise<IBusinessResponse>;
}

export interface IBusinessDetailsRepository {
	uploadBusinessDetailsDocument(data: BusinessDetailsDto): Promise<{ message: string }>;
	getBySessionId(sessionId: string): Promise<IBusiness>;
}
