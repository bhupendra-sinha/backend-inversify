import { BaseHttpController, controller, httpGet, httpPost, requestBody, requestParam } from 'inversify-express-utils';
import { OtherDto } from '../data/request/other_request.dto';
import OtherService from '../services/other.service';
import TYPES from '@core/types';
import { inject } from 'inversify';
import { AppResponse } from '@core/data/response/app.response';

@controller('/api/v1/other-details')
class OtherController extends BaseHttpController {
	constructor(@inject(TYPES.OTHER_SERVICE) private otherService: OtherService) {
		super();
	}

	@httpGet('documents/session/:sessionId')
	async getOtherDetails(@requestParam('sessionId') sessionId: string) {
		const result = await this.otherService.getBySessionId(sessionId);
		return this.ok(AppResponse.success(result));
	}

	@httpPost('documents/upload')
	async uploadOtherDocument(@requestBody() data: OtherDto) {
		const result = await this.otherService.uploadOtherDocument(data);
		return this.ok(AppResponse.success(result));
	}
}

export default OtherController;
