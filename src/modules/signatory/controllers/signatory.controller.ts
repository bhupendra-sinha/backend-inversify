import { AppResponse } from '@core/data/response/app.response';
import { BaseHttpController, controller, httpGet, httpPut, requestBody, requestParam } from 'inversify-express-utils';

@controller('/api/v1/signatory')
class SignatoryController extends BaseHttpController {
	constructor() {
		super();
	}

	@httpPut('/verification')
	async verify(@requestBody() data: any) {
		return this.ok(AppResponse.success(data));
	}

	@httpGet('/documents/session/:sessionId')
	async getBySessionId(@requestParam('sessionId') sessionId: string) {
		return this.ok(AppResponse.success(sessionId));
	}
}

export default SignatoryController;
