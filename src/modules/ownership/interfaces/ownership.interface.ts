import { OwnershipDto } from '../data/request/ownership_request.dto';
import { IOwnershipResponseDto } from '../data/response/ownership_response.dto';

export interface IOwnershipService {
	uploadOwnershipDocument(body: OwnershipDto): Promise<{ message: string }>;
	getBySessionId(sessionId: string): Promise<IOwnershipResponseDto>;
}

export interface IOwnershipRepository {
	uploadOwnershipDocument(body: OwnershipDto): Promise<{ message: string }>;
	getBySessionId(sessionId: string): Promise<IOwnershipResponseDto>;
}
