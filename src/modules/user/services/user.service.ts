import { inject, injectable } from 'inversify';
import { UserDto } from '../data/request/user.dto';
import { UserDetail } from '../data/response/user.dto';
import TYPES from '@core/types';
import { ILogger } from '@core/logger/logger.interface';
import { UserRepository } from '../repositories/user.repository';

@injectable()
export class UserService {
	constructor(
		@inject(TYPES.LOGGER) private logger: ILogger,
		@inject(TYPES.USER_REPOSITORY) private userRepository: UserRepository
	) {}

	async create(data: UserDto): Promise<UserDetail> {
		this.logger.debug('Creating user', data);
		const user = await this.userRepository.create(data);
		return user;
	}
}
