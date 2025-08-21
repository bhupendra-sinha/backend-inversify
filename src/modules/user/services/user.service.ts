import { injectable } from 'inversify';

@injectable()
export class UserService {
	constructor() {}

	async create(data: any) {
		return data;
	}
}
