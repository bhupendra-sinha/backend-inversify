import TYPES from '@core/types';
import { inject } from 'inversify';
import { BaseHttpController, controller, httpGet, httpPut, requestBody, requestParam } from 'inversify-express-utils';
import { validateMiddleware } from '@core/middleware/validate.middleware';
import { OwnershipDto, ownershipSchema } from '../data/request/ownership_request.dto';
import { AppResponse } from '@core/data/response/app.response';
import OwnershipService from '../services/ownership.service';
import { ownershipFields } from '@utils/constant';

@controller('/api/v1/ownership')
class OwnershipController extends BaseHttpController {
	constructor(@inject(TYPES.OWNERSHIP_SERVICE) private ownershipService: OwnershipService) {
		super();
	}

	@httpPut('/documents/upload', validateMiddleware(ownershipSchema, ownershipFields))
	async uploadOwnershipDocument(@requestBody() body: OwnershipDto) {
		const result = await this.ownershipService.uploadOwnershipDocument(body);
		return this.ok(AppResponse.success(result));
	}

	@httpGet('/documents/session/:sessionId')
	async getBySessionId(@requestParam() sessionId: string) {
		const result = await this.ownershipService.getBySessionId(sessionId);
		return this.ok(AppResponse.success(result));
	}
}

export default OwnershipController;
