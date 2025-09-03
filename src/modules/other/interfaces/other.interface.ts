import { OtherDto } from '../data/request/other_request.dto';
import { IOtherResponse } from '../data/response/other_response.dto';

export interface IOtherService {
	getBySessionId(sessionId: string): Promise<IOtherResponse>;
	uploadOtherDocument(data: OtherDto): Promise<{ message: string }>;
}

export interface IOtherRepository {
	getBySessionId(sessionId: string): Promise<IOtherResponse>;
	uploadOtherDocument(data: OtherDto): Promise<{ message: string }>;
}
