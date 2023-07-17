import CategoryMapper from './mappers/CategoryMapper';
import getApiUrl from './utils/ApiUrl';
import HttpClient from './utils/HttpClient';

class ContactsService {
	constructor() {
		this.httpClient = new HttpClient(getApiUrl());
	}

	async getCategories() {
		const categories = await this.httpClient.get('/categories');
		return categories.map(CategoryMapper.toDomain);
	}

}

export default new ContactsService();
