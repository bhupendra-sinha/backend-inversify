import { IFinancialResponse } from '../data/response/financial_response.dto';
import { FinancialDto } from '../data/request/financial_request.dto';

export interface IFinancialService {
	getBySessionId(sessionId: string): Promise<IFinancialResponse>;
	uploadFinancialDocument(data: FinancialDto): Promise<{ message: string }>;
}

export interface IFinancialRepository {
	getBySessionId(sessionId: string): Promise<IFinancialResponse>;
	uploadFinancialDocument(data: FinancialDto): Promise<{ message: string }>;
}
