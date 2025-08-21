import { ContainerModule } from 'inversify';
import { ILogger } from './logger/logger.interface';
import TYPES from './types';
import { DbService } from './db/db.service';
import { Logger } from './logger/winston.logger';
import { ConfigService } from './config/config';
import { ErrorHandlerMiddleware } from './error/errorHandling.middleware';

const coreModule = new ContainerModule(bind => {
	bind<ILogger>(TYPES.LOGGER).to(Logger).inSingletonScope();
	bind<ConfigService>(TYPES.CONFIG).to(ConfigService).inSingletonScope();
	bind<DbService>(TYPES.DB).to(DbService).inSingletonScope();
	bind<ErrorHandlerMiddleware>(TYPES.ERROR_HANDLER).to(ErrorHandlerMiddleware).inSingletonScope();
});

export default coreModule;
