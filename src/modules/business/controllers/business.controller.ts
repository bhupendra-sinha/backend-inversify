import { BaseHttpController, controller, httpGet, httpPut, requestBody, requestParam } from 'inversify-express-utils';
import { AppResponse } from '@core/data/response/app.response';
import { BusinessDto, businessSchema } from '../data/request/business_request.dto';
import { Body } from 'tsoa';
import { validateMiddleware } from '@core/middleware/validate.middleware';
import { inject } from 'inversify';
import TYPES from '@core/types';
import BusinessService from '../services/business.service';

@controller('/api/v1/business-details')
export class BusinessController extends BaseHttpController {
	constructor(@inject(TYPES.BUSINESS_SERVICE) private businessService: BusinessService) {
		super();
	}

	@httpPut('/documents/upload', validateMiddleware(businessSchema))
	async create(@requestBody() @Body() body: BusinessDto) {
		const result = await this.businessService.uploadBusinessDocument(body);
		return this.ok(AppResponse.success(result));
	}

	@httpGet('/documents/session/:sessionId')
	async getBySessionId(@requestParam() sessionId: string) {
		const result = await this.businessService.getBySessionId(sessionId);
		return this.ok(AppResponse.success(result));
	}
}
