import { ContainerModule } from 'inversify';
import { ILogger } from './logger/logger.interface';
import TYPES from './types';
import { DbService } from './db/db.service';
import { Logger } from './logger/winston.logger';
import { ConfigService } from './config/config';
import { ErrorHandlerMiddleware } from './error/errorHandling.middleware';
import { HttpClientService } from './services/http_AI.service';
import { RedisService } from './services/redis.service';

const coreModule = new ContainerModule(bind => {
	bind<ILogger>(TYPES.LOGGER).to(Logger).inSingletonScope();
	bind<ConfigService>(TYPES.CONFIG).to(ConfigService).inSingletonScope();
	bind<DbService>(TYPES.DB).to(DbService).inSingletonScope();
	bind<ErrorHandlerMiddleware>(TYPES.ERROR_HANDLER).to(ErrorHandlerMiddleware).inSingletonScope();

	// INFO :- HTTP AI Client
	bind<HttpClientService>(TYPES.HTTP_AI).to(HttpClientService).inSingletonScope();

	// INFO :- Redis Client
	bind<RedisService>(TYPES.REDIS_SERVICE).to(RedisService).inSingletonScope();
});

export default coreModule;
