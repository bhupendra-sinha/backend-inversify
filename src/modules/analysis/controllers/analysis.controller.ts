import { AppResponse } from '@core/data/response/app.response';
import { BaseHttpController, controller, httpGet, requestParam } from 'inversify-express-utils';

@controller('/api/v1')
class AnalysisController extends BaseHttpController {
	constructor() {
		super();
	}

	@httpGet('/session/:sessionId/lease-agreement/analysis')
	async getAnalysis(@requestParam('sessionId') sessionId: string) {
		console.log(sessionId);
		return this.ok(AppResponse.success('analysis'));
	}

	@httpGet('/session/:sessionId/bank-statement/analysis')
	async getBankStatementAnalysis(@requestParam('sessionId') sessionId: string) {
		console.log(sessionId);
		return this.ok(AppResponse.success('analysis'));
	}

	@httpGet('/session/:sessionId/company/summary')
	async getCompanySummaryAnalysis(@requestParam('sessionId') sessionId: string) {
		console.log(sessionId);
		return this.ok(AppResponse.success('analysis'));
	}
}

export default AnalysisController;
