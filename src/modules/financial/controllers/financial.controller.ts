import TYPES from '@core/types';
import { inject } from 'inversify';
import { BaseHttpController, controller, httpGet, httpPost, requestBody, requestParam } from 'inversify-express-utils';
import { validateMiddleware } from '@core/middleware/validate.middleware';
import { FinancialDto, financialSchema } from '../data/request/financial_request.dto';
import FinancialService from '../services/financial.service';
import { AppResponse } from '@core/data/response/app.response';

@controller('/api/v1/financials-details')
class FinancialController extends BaseHttpController {
	constructor(@inject(TYPES.FINANCIAL_SERVICE) private financialService: FinancialService) {
		super();
	}

	@httpGet('documents/session/:sessionId')
	async getBySessionId(@requestParam('sessionId') sessionId: string) {
		const result = await this.financialService.getBySessionId(sessionId);
		return this.ok(AppResponse.success(result));
	}

	@httpPost('documents/upload', validateMiddleware(financialSchema))
	async uploadFinancialDocument(@requestBody() data: FinancialDto) {
		const result = await this.financialService.uploadFinancialDocument(data);
		return this.ok(AppResponse.success(result));
	}
}

export default FinancialController;
