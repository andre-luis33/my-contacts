const ContactsRepository = require('../repositories/ContactsRepository');
const isValidUUID = require('../utils/isValidUUID');

class ContactController {

	/** @type {import("express").RequestHandler} */
	async index(request, response) {
		const { orderBy } = request.query;
		const contacts = await ContactsRepository.findAll(orderBy);
		return response.json(contacts);
	}


	/** @type {import("express").RequestHandler} */
	async show(request, response) {
		const { id } = request.params;

		if(!isValidUUID(id)) {
			return response.status(400).json({ error: 'Invalid contact id' });
		}

		const contact = await ContactsRepository.findById(id);
		if(!contact) {
			response.status(404).json({ error: 'User not found' });
			return;
		}

		response.json(contact);
	}


	/** @type {import("express").RequestHandler} */
	async store (request, response) {
		const { name, email, phone, category_id } = request.body;

		if(!name) {
			return response.status(400).json({ error: '{name} is required!' });
		}

		if(category_id && !isValidUUID(category_id)) {
			return response.status(400).json({ error: 'Invalid category id' });
		}

		if(email) {
			const contactExists = await ContactsRepository.findByEmail(email);
			if(contactExists) {
				return response.status(400).json({ error: 'This e-mail is already taken' });
			}
		}

		const contact = await ContactsRepository.create({
			name,
			email: email || null,
			phone,
			category_id: category_id || null
		});

		response.status(201).json(contact);
	}


	/** @type {import("express").RequestHandler} */
	async update (request, response) {
		const { id } = request.params;
		const { name, email, phone, category_id } = request.body;

		if(!isValidUUID(id)) {
			return response.status(400).json({ error: 'Invalid contact id' });
		}

		if(category_id && !isValidUUID(category_id)) {
			return response.status(400).json({ error: 'Invalid category id' });
		}

		if(!name) {
			return response.status(400).json({ error: '{name} is required!' });
		}

		const contactExists = await ContactsRepository.findById(id);
		if(!contactExists) {
			return response.status(404).json({ error: 'User not found' });
		}

		if(email) {
			const contactByEmail = await ContactsRepository.findByEmail(email);
			if(contactByEmail && contactByEmail.id !== id) {
				return response.status(400).json({ error: 'This e-mail is already taken' });
			}
		}

		const contact = await ContactsRepository.update(id, {
			name,
			email: email || null,
			phone,
			category_id: category_id || null
		});

		response.json(contact);
	}


	/** @type {import("express").RequestHandler} */
	async delete(request, response) {
		const { id } = request.params;

		if(!isValidUUID(id)) {
			return response.status(400).json({ error: 'Invalid contact id' });
		}

		await ContactsRepository.delete(id);
		response.sendStatus(204);
	}
}

module.exports = new ContactController();
