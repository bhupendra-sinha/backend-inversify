import { InversifyExpressServer } from 'inversify-express-utils';
import { inject, injectable } from 'inversify';
import express from 'express';
import cors from 'cors';
import { DbService } from '@core/db/db.service';
import { ILogger } from '@core/logger/logger.interface';
import { ConfigService } from '@core/config/config';
import TYPES from '@core/types';
import { ErrorHandlerMiddleware } from '@core/error/errorHandling.middleware';
import container from '@core/di/inversify.config';

@injectable()
export class Application {
	private app: express.Application;
	private server: InversifyExpressServer;

	constructor(
		@inject(TYPES.DB) private dbService: DbService,
		@inject(TYPES.LOGGER) private logger: ILogger,
		@inject(TYPES.CONFIG) private config: ConfigService,
		@inject(TYPES.ERROR_HANDLER) private errorHandler: ErrorHandlerMiddleware
	) {
		this.server = new InversifyExpressServer(container, null, null, null, null);
		this.app = express();
	}

	async initialize(): Promise<void> {
		this.server.setConfig(app => {
			app.use(express.json());
			app.use(express.urlencoded({ extended: true }));
			app.use(cors(this.config.getCorsConfig()));

			app.use((req, res, next) => {
				this.logger.debug(`${req.method} ${req.url}`, {
					body: req.body,
					query: req.query,
					params: req.params
				});
				next();
			});
		});

		this.server.setErrorConfig(app => {
			app.use(this.errorHandler.handle.bind(this.errorHandler));
		});
	}

	async start(): Promise<void> {
		// Initialize the server
		// console.log('COMING HERE');
		// this.app = this.server.build();
		// console.log('COMING HERE 2');
		const serverConfig = this.config.getServerConfig();
		this.app.get('/health', (req, res) => {
			res.status(200).send(`BE is running!`);
		});

		return new Promise(resolve => {
			this.dbService.initialize();
			this.app?.listen(serverConfig.port, () => {
				this.logger.info(`Server running in ${serverConfig.logLevel} mode on port ${serverConfig.port}`);
				resolve();
			});
		});
	}

	getExpressApp(): express.Application | undefined {
		return this.app;
	}
}
