import { ConfigService } from '@core/config/config';
import { ILogger } from '@core/logger/logger.interface';
import TYPES from '@core/types';
import { inject, injectable } from 'inversify';
import Redis, { Redis as RedisClient } from 'ioredis';

@injectable()
export class RedisService {
	private client: RedisClient;

	constructor(
		@inject(TYPES.CONFIG) private config: ConfigService,
		@inject(TYPES.LOGGER) private logger: ILogger
	) {
		this.client = new Redis({
			host: this.config.getRedisConfig().BASE_URL,
			port: this.config.getRedisConfig().PORT,
			username: this.config.getRedisConfig().USERNAME,
			password: this.config.getRedisConfig().PASSWORD
		});
	}

	async initialize(): Promise<RedisClient> {
		try {
			this.client.on('connect', () => {
				this.logger.info('✅ Redis connected');
			});
			this.client.on('error', err => {
				this.logger.error('❌ Redis error', err);
			});

			return this.client;
		} catch (error) {
			this.logger.error('❌ Redis error', error as Error);
			throw error;
		}
	}

	async set(key: string, value: any, ttlSeconds?: number): Promise<void> {
		const stringValue = JSON.stringify(value);
		await this.client.setex(key, ttlSeconds || 60, stringValue);
	}

	async get<T>(key: string): Promise<T | null> {
		const value = await this.client.get(key);
		return value ? JSON.parse(value) : null;
	}

	async del(key: string): Promise<void> {
		await this.client.del(key);
	}

	async ttl(key: string): Promise<number> {
		return this.client.ttl(key);
	}
}
