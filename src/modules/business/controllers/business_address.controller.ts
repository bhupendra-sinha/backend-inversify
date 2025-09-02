import { BaseHttpController, controller, httpPut, httpGet, requestBody, requestParam } from 'inversify-express-utils';
import { AppResponse } from '@core/data/response/app.response';
import { validateMiddleware } from '@core/middleware/validate.middleware';
import { inject } from 'inversify';
import TYPES from '@core/types';
import BusinessAddressService from '../services/business_address.service';
import { BusinessAddressDto } from '../data/request/business_address_request.dto';
import { businessAddressSchema } from '../data/request/business_address_request.dto';

@controller('/api/v1/business-address')
class BusinessAddressController extends BaseHttpController {
	constructor(@inject(TYPES.BUSINESS_ADDRESS_SERVICE) private businessService: BusinessAddressService) {
		super();
	}

	@httpPut('/documents/upload', validateMiddleware(businessAddressSchema))
	async uploadBusinessAddressDocument(@requestBody() body: BusinessAddressDto) {
		const result = await this.businessService.uploadBusinessAddressDocument(body);
		return this.ok(AppResponse.success(result));
	}

	@httpGet('/documents/session/:sessionId')
	async getBySessionId(@requestParam() sessionId: string) {
		const result = await this.businessService.getBySessionId(sessionId);
		return this.ok(AppResponse.success(result));
	}
}

export default BusinessAddressController;
