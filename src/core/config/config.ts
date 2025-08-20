import { injectable } from "inversify";
import { DatabaseConfig, ServerConfig, ValidatedEnv } from "./config.types";
import { validateEnv } from "./config.validation";

@injectable()
export class ConfigService {
  private readonly env: ValidatedEnv;

  constructor() {
    this.env = validateEnv;
  }

  getServerConfig(): ServerConfig {
    return {
      logLevel: this.env.SERVER_LOG_LEVEL,
    };
  }

  getDatabaseConfig(): DatabaseConfig {
    const entities = [__dirname + "src/modules/**/entities/*.entity.js"];

    return {
      port: this.env.PG_PORT,
      host: this.env.PG_HOST,
      username: this.env.PG_USER,
      password: this.env.PG_PASSWORD,
      database: this.env.PG_DATABASE_NAME,
      logging: false,
      entities,
      ssl: { rejectUnauthorized: false },
    };
  }
}
