const CategoriesRepository = require('../repositories/CategoriesRepository');
const isValidUUID = require('../utils/isValidUUID');

class CategoryController {

	/** @type {import("express").RequestHandler} */
	async index(request, response) {
		const categories = await CategoriesRepository.findAll();
		return response.json(categories);
	}

	/** @type {import("express").RequestHandler} */
	async store(request, response) {
		const { name } = request.body;

		if(!name) {
			return response.status(400).json({ error: '{name} is required!' });
		}

		const categorieExists = await CategoriesRepository.findByName(name);
		if(categorieExists) {
			return response.status(400).json({ error: 'This categorie already exists!' });
		}

		const categorie = await CategoriesRepository.create({ name });
		return response.status(201).json(categorie);

	}

	/** @type {import("express").RequestHandler} */
	async delete(request, response) {
		const { id } = request.params;

		if(!isValidUUID(id)) {
			return response.status(400).json({ error: 'Invalid category id' });
		}

		await CategoriesRepository.delete(id);
		return response.sendStatus(204);

	}

}

module.exports = new CategoryController();
