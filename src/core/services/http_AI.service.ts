import { inject, injectable } from 'inversify';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import TYPES from '@core/types';
import { ConfigService } from '@core/config/config';

@injectable()
export class HttpClientService {
	private aiService: AxiosInstance;

	constructor(@inject(TYPES.CONFIG) private config: ConfigService) {
		this.aiService = axios.create({
			baseURL: this.config.getAIServerConfig().BASE_URL + '/api/v1/documents'
		});
	}

	async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
		const response = await this.aiService.get<T>(url, config);
		return response.data;
	}

	async post<T>(url: string, body: any, config?: AxiosRequestConfig): Promise<T> {
		const response = await this.aiService.post<T>(url, body, config);
		return response.data;
	}

	async put<T>(url: string, body: any, config?: AxiosRequestConfig): Promise<T> {
		const response = await this.aiService.put<T>(url, body, config);
		return response.data;
	}

	async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
		const response = await this.aiService.delete<T>(url, config);
		return response.data;
	}
}
