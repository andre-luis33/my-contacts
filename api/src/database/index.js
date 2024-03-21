const { Client } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const client = new Client({
	connectionString: process.env.DB_CONNECTION_STRING
});

client.connect();

exports.query = async (query, values) => {
	const { rows } = await client.query(query, values);
	return rows;
};
