import { ContainerModule } from "inversify";
import { ILogger } from "./logger/logger.interface";
import TYPES from "./types";
import { DbService } from "./db/db.service";
import { Logger } from "./logger/winston.logger";
import { ConfigService } from "./config/config";

const coreModule = new ContainerModule((bind) => {
  bind<ILogger>(TYPES.LOGGER).to(Logger).inSingletonScope();
  bind<ConfigService>(TYPES.CONFIG).to(ConfigService).inSingletonScope();
  bind<DbService>(TYPES.DB).to(DbService).inSingletonScope();
});

export default coreModule;
