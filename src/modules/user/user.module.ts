import { ContainerModule } from 'inversify';
import TYPES from '../../core/types';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { UserRepository } from './repositories/user.repository';
import { UserEntity } from './entities/user.entity';
import { DbService } from '@core/db/db.service';
import { Repository } from 'typeorm';

const userModule = new ContainerModule(bind => {
	bind<UserService>(TYPES.USER_SERVICE).to(UserService).inSingletonScope();
	bind<UserController>(TYPES.USER_CONTROLLER).to(UserController).inSingletonScope();
	bind<UserRepository>(TYPES.USER_REPOSITORY).to(UserRepository).inSingletonScope();
	bind<Repository<UserEntity>>(TYPES.USER_MODAL)
		.toDynamicValue(context => {
			const dbService = context.container.get<DbService>(TYPES.DB);
			return dbService.getDataSource().getRepository(UserEntity);
		})
		.inSingletonScope();
});

export default userModule;
