import { InversifyExpressServer } from 'inversify-express-utils';
import { inject, injectable } from 'inversify';
import express from 'express';
import cors from 'cors';
import { DbService } from '@core/db/db.service';
import { ILogger } from '@core/logger/logger.interface';
import { ConfigService } from '@core/config/config';
import TYPES from '@core/types';
import container from '@core/di/inversify.config';

@injectable()
export class Application {
	private app: express.Application | undefined;
	private server: InversifyExpressServer;

	constructor(
		@inject(TYPES.DB) private dbService: DbService,
		@inject(TYPES.LOGGER) private logger: ILogger,
		@inject(TYPES.CONFIG) private config: ConfigService
	) {
		this.server = new InversifyExpressServer(container, null, null, null, null);
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
			app.use((err: Error, req: express.Request, res: express.Response) => {
				this.logger.error(err.message, err);
				res.status(500).json({ error: err.message });
			});
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
			this.app?.listen(8080, () => {
				this.logger.info(`Server running in ${serverConfig.logLevel} mode on port 8080`);
				resolve();
			});
		});
	}

	getExpressApp(): express.Application | undefined {
		return this.app;
	}
}
