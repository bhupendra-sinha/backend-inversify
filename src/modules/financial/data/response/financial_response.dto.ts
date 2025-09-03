import { DocumentStatus } from '@utils/constant';

export interface IStatementDuration {
	startDate: string;
	endDate: string;
}

export interface IFinancialPeriod {
	startDate: string;
	endDate: string;
}

export interface IBankStatement {
	documentStatus: DocumentStatus;
	statementDuration: IStatementDuration;
	statementOwner: string;
	totalCredits: number;
	totalDebits: number;
}

export interface IAuditedFinancials {
	documentStatus: DocumentStatus;
	companyName: string;
	financialPeriod: IFinancialPeriod;
	grossRevenues: number;
	netProfits: number;
}

export interface IFinancialResponse {
	userSessionId: string;
	bankStatement: IBankStatement;
	auditedFinancials: IAuditedFinancials;
}
