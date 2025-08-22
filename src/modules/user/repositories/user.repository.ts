import TYPES from '@core/types';
import { inject, injectable } from 'inversify';
import { Repository } from 'typeorm';
import { UserDto } from '../data/request/user.dto';
import { UserDetail } from '../data/response/user.dto';
import { UserEntity } from '../entities/user.entity';
import { NotFoundError } from '@core/data/error/app.error';
import { ListData } from '@core/data/entity/common.model';
import { IUserRepository } from '../interfaces/user.interface';

@injectable()
export class UserRepository implements IUserRepository {
	constructor(@inject(TYPES.USER_MODEL) private readonly userModel: Repository<UserEntity>) {}

	async create(data: UserDto): Promise<UserDetail> {
		const user = this.userModel.create(data);

		await this.userModel.save(user);

		return await this.findByIdOrFail(user.id);
	}

	async findByIdOrFail(id: string): Promise<UserDetail> {
		const user = await this.userModel.findOne({ where: { id } });
		if (!user) {
			throw new NotFoundError('User not found');
		}
		return user;
	}

	async findAll(): Promise<ListData<UserDetail>> {
		const [users, count] = await this.userModel.findAndCount();
		return { items: users, totalCount: count, totalPages: 1, hasMore: count > 10 };
	}
}
