import { BusinessDto } from '../data/request/business_request.dto';
import { IBusiness, IBusinessResponse } from '../data/response/business_response.dto';

export interface IBusinessService {
	uploadBusinessDocument(data: BusinessDto): Promise<{ message: string }>;
	getBySessionId(sessionId: string): Promise<IBusinessResponse>;
}

export interface IBusinessRepository {
	uploadBusinessDocument(data: BusinessDto): Promise<{ message: string }>;
	getBySessionId(sessionId: string): Promise<IBusiness>;
}
