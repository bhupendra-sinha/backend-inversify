import { ListData } from '@core/data/entity/common.model';
import { UserDto } from '../data/request/user.dto';
import { UserDetail } from '../data/response/user.dto';

export interface IUserService {
	create(data: UserDto): Promise<UserDetail>;
	findAll(): Promise<ListData<UserDetail>>;
}

export interface IUserRepository {
	create(data: UserDto): Promise<UserDetail>;
	findAll(): Promise<ListData<UserDetail>>;
}
