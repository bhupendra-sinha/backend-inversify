import TYPES from '@core/types';
import { inject } from 'inversify';
import { BaseHttpController, controller, httpGet, httpPost, requestBody, requestParam } from 'inversify-express-utils';
import { validateMiddleware } from '@core/middleware/validate.middleware';
import { FinancialDto, financialSchema } from '../data/request/financial_request.dto';
import FinancialService from '../services/financial.service';

@controller('/financial')
class FinancialController extends BaseHttpController {
	constructor(@inject(TYPES.FINANCIAL_SERVICE) private financialService: FinancialService) {
		super();
	}

	@httpGet('/getBySessionId/:sessionId')
	async getBySessionId(@requestParam('sessionId') sessionId: string) {
		return this.ok(await this.financialService.getBySessionId(sessionId));
	}

	@httpPost('/uploadFinancialDocument', validateMiddleware(financialSchema))
	async uploadFinancialDocument(@requestBody() data: FinancialDto) {
		return this.ok(await this.financialService.uploadFinancialDocument(data));
	}
}

export default FinancialController;
