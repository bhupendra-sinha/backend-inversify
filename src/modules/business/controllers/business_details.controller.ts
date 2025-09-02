import { BaseHttpController, controller, httpGet, httpPut, requestBody, requestParam } from 'inversify-express-utils';
import { AppResponse } from '@core/data/response/app.response';
import { validateMiddleware } from '@core/middleware/validate.middleware';
import { inject } from 'inversify';
import TYPES from '@core/types';
import BusinessDetailsService from '../services/business_details.service';
import { BusinessDetailsDto } from '../data/request/business_details_request.dto';
import { businessDetailsSchema } from '../data/request/business_details_request.dto';

@controller('/api/v1/business-details')
class BusinessDetailsController extends BaseHttpController {
	constructor(@inject(TYPES.BUSINESS_SERVICE) private businessService: BusinessDetailsService) {
		super();
	}

	@httpPut('/documents/upload', validateMiddleware(businessDetailsSchema))
	async uploadBusinessDetailsDocument(@requestBody() body: BusinessDetailsDto) {
		const result = await this.businessService.uploadBusinessDetailsDocument(body);
		return this.ok(AppResponse.success(result));
	}

	@httpGet('/documents/session/:sessionId')
	async getBySessionId(@requestParam() sessionId: string) {
		const result = await this.businessService.getBySessionId(sessionId);
		return this.ok(AppResponse.success(result));
	}
}

export default BusinessDetailsController;
