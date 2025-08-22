import { InversifyExpressServer } from 'inversify-express-utils';
import { inject, injectable } from 'inversify';
import express from 'express';
import cors from 'cors';
import { DbService } from '@core/db/db.service';
import { ILogger } from '@core/logger/logger.interface';
import { ConfigService } from '@core/config/config';
import TYPES from '@core/types';
import container from '@core/di/inversify.config';
import { ErrorHandlerMiddleware } from '@core/error/errorHandling.middleware';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from './swagger/swagger.json';

@injectable()
export class Application {
	private app: express.Application | undefined;
	private server: InversifyExpressServer;

	constructor(
		@inject(TYPES.DB) private dbService: DbService,
		@inject(TYPES.LOGGER) private logger: ILogger,
		@inject(TYPES.CONFIG) private config: ConfigService,
		@inject(TYPES.ERROR_HANDLER) private errorHandler: ErrorHandlerMiddleware
	) {
		this.server = new InversifyExpressServer(container);
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

			// INFO :- Swagger docs
			app.use(
				'/docs',
				swaggerUi.serve,
				swaggerUi.setup(swaggerDocument, {
					customSiteTitle: 'Ruya Bank API Docs'
				})
			);
		});

		this.server.setErrorConfig(app => {
			app.use(this.errorHandler.handle.bind(this.errorHandler));
		});
	}

	async start(): Promise<void> {
		// Initialize the server
		this.app = this.server.build();
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
