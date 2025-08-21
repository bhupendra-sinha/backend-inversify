import { inject, injectable } from 'inversify';
import { DataSource } from 'typeorm';
import TYPES from '../types';
import { AppDataSource } from './db.config';
import { ILogger } from '../logger/logger.interface';

@injectable()
export class DbService {
	private dataSource: DataSource;

	constructor(@inject(TYPES.LOGGER) private readonly logger: ILogger) {
		this.dataSource = AppDataSource;
	}

	async initialize(): Promise<DataSource> {
		try {
			if (!this.dataSource.isInitialized) {
				await this.dataSource.initialize();
				this.logger.info('Database connection established');
			}
			return this.dataSource;
		} catch (error) {
			this.logger.error('Database connection failed', error as Error);
			throw error;
		}
	}
}
