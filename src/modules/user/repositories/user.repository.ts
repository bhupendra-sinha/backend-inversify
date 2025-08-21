import TYPES from '@core/types';
import { inject, injectable } from 'inversify';
import { Repository } from 'typeorm';
import { UserDto } from '../data/request/user.dto';
import { UserDetail } from '../data/response/user.dto';
import { UserEntity } from '../entities/user.entity';
import { NotFoundError } from '@core/data/error/app.error';

@injectable()
export class UserRepository {
	constructor(@inject(TYPES.USER_MODAL) private readonly userModal: Repository<UserEntity>) {}

	async create(data: UserDto): Promise<UserDetail> {
		const user = this.userModal.create(data);

		console.log('USER', user);
		await this.userModal.save(user);

		return this.findByIdOrFail(user.id);
	}

	async findByIdOrFail(id: number): Promise<UserDetail> {
		const user = await this.userModal.findOne({ where: { id } });
		if (!user) {
			throw new NotFoundError('User not found');
		}
		return user;
	}
}
