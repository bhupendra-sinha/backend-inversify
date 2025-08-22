import { BaseHttpController, controller, httpGet, httpPost, requestBody } from 'inversify-express-utils';
import { validateMiddleware } from '@core/middleware/validate.middleware';
import { UserDto, userSchema } from '../data/request/user.dto';
import { inject } from 'inversify';
import TYPES from '@core/types';
import { UserService } from '../services/user.service';
import { AppResponse } from '@core/data/response/app.response';
import { Route, Post, Body, Get } from 'tsoa';

@Route('user')
@controller('/api/user')
export class UserController extends BaseHttpController {
	constructor(@inject(TYPES.USER_SERVICE) private userService: UserService) {
		super();
	}

	@Post('/')
	@httpPost('/', validateMiddleware(userSchema))
	async create(@requestBody() @Body() body: UserDto) {
		const result = await this.userService.create(body);
		return this.ok(AppResponse.success(result));
	}

	@Get('/')
	@httpGet('/')
	async findAll() {
		const result = await this.userService.findAll();
		return this.ok(AppResponse.success(result));
	}
}
